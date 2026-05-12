import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Video, GuestRole } from '@/data/videos'

type SupabaseTag = {
  id: number
  label: string
  slug: string
  tag_type: 'country' | 'position'
}

type SupabaseVideo = {
  id: number
  video_id: string
  title: string
  published_at: string | null
  country_tag_id: number | null
  position_tag_ids: number[]
  thumbnail_standard: { url?: string } | null
  thumbnail_maxres: { url?: string } | null
}

const SLUG_TO_ROLE: Record<string, GuestRole> = {
  backend: 'Backend',
  'back-end': 'Backend',
  frontend: 'Frontend',
  'front-end': 'Frontend',
  mobile: 'Mobile',
  'mobile-developer': 'Mobile',
  data: 'Data',
  'data-scientist': 'Data',
  'data-engineer': 'Data',
  'product-manager': 'Product Manager',
  'devops-sre': 'DevOps / SRE',
  devops: 'DevOps / SRE',
  designer: 'Designer',
  'product-designer': 'Designer',
  'ux-researcher': 'Designer',
  founder: 'Founder',
  student: 'Student',
  'software-engineer': 'Backend',
  'cloud-engineer': 'DevOps / SRE',
  'security-engineer': 'Backend',
  'network-engineer': 'Backend',
  'embedded-engineer': 'Backend',
  'system-admin': 'DevOps / SRE',
  'engineering-manager': 'Backend',
  'qa-engineer': 'Backend',
  'game-artist': 'Designer',
}

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchVideos() {
      try {
        const [videosResult, tagsResult] = await Promise.all([
          supabase
            .from('youtube_videos')
            .select('id,video_id,title,published_at,country_tag_id,position_tag_ids,thumbnail_standard,thumbnail_maxres')
            .order('published_at', { ascending: false }),
          supabase
            .from('youtube_tags')
            .select('id,label,slug,tag_type')
            .order('label', { ascending: true }),
        ])

        if (videosResult.error) throw new Error(videosResult.error.message)
        if (tagsResult.error) throw new Error(tagsResult.error.message)

        const tags = (tagsResult.data || []) as SupabaseTag[]
        const tagMap = new Map(tags.map(t => [t.id, t]))

        const mapped: Video[] = ((videosResult.data || []) as SupabaseVideo[]).map((v, idx) => {
          const countryTag = v.country_tag_id ? tagMap.get(v.country_tag_id) : null
          const positionTags = (v.position_tag_ids || [])
            .map(id => tagMap.get(id))
            .filter(Boolean) as SupabaseTag[]

          const role: GuestRole = positionTags.length > 0
            ? (SLUG_TO_ROLE[positionTags[0].slug] || 'Backend')
            : 'Backend'

          return {
            id: String(v.id),
            title: v.title,
            guestName: '',
            guestRole: role,
            country: countryTag?.slug || countryTag?.label || 'Unknown',
            youtubeId: v.video_id,
            recordedAt: v.published_at || '',
            shortDescription: '',
            tags: positionTags.map(t => t.label),
            featured: idx < 3,
          }
        })

        setVideos(mapped)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load videos')
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return { videos, loading, error }
}
