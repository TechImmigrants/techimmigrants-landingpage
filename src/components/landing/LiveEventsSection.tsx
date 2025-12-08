import { useState } from "react";
import { Calendar, MapPin, Send, Video, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { events } from "@/data/events";
import { COUNTRY_LABELS, ROLE_LABELS } from "@/data/videos";
import { toast } from "sonner";

interface QuestionFormData {
  name: string;
  contact: string;
  question: string;
}

// Generate calendar URLs
function generateGoogleCalendarUrl(event: typeof events[0]) {
  const startDate = new Date(event.datetime);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

  const formatDate = (date: Date) =>
    date.toISOString().replace(/-|:|\.\d{3}/g, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    details: `${event.description}\n\nمهمان: ${event.guestName}${event.youtubeOrEventUrl ? `\n\nلینک لایو: ${event.youtubeOrEventUrl}` : ""}`,
    location: event.platform,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function generateICSContent(event: typeof events[0]) {
  const startDate = new Date(event.datetime);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  const formatDate = (date: Date) =>
    date.toISOString().replace(/-|:|\.\d{3}/g, "").slice(0, -1) + "Z";

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tech Immigrants//Live Event//FA
BEGIN:VEVENT
UID:${event.id}@techimmigrants.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}\\n\\nمهمان: ${event.guestName}${event.youtubeOrEventUrl ? `\\n\\nلینک لایو: ${event.youtubeOrEventUrl}` : ""}
LOCATION:${event.platform}
END:VEVENT
END:VCALENDAR`;
}

function downloadICS(event: typeof events[0]) {
  const content = generateICSContent(event);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.title.replace(/\s+/g, "_")}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function LiveEventsSection() {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, QuestionFormData>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("fa-IR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleSubmitQuestion = (eventId: string, e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(eventId);

    const data = formData[eventId] || { name: "", contact: "", question: "" };
    console.log(`Question submitted for event ${eventId}:`, data);

    setTimeout(() => {
      toast.success("سوال شما ثبت شد! ممکنه در لایو بهش جواب داده بشه.");
      setFormData((prev) => ({
        ...prev,
        [eventId]: { name: "", contact: "", question: "" },
      }));
      setExpandedEventId(null);
      setSubmitting(null);
    }, 500);
  };

  const updateFormData = (eventId: string, field: keyof QuestionFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [eventId]: {
        ...(prev[eventId] || { name: "", contact: "", question: "" }),
        [field]: value,
      },
    }));
  };

  return (
    <section id="lives" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            لایوهای آینده
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            در لایوهای ما شرکت کنید و مستقیماً سوالاتتون رو از مهمان‌ها بپرسید. می‌تونید از همین الان سوالاتتون رو بفرستید.
          </p>
        </div>

        {events.length > 0 ? (
          <div className="grid gap-6 max-w-3xl mx-auto">
            {events.map((event) => {
              const isExpanded = expandedEventId === event.id;
              const eventForm = formData[event.id] || { name: "", contact: "", question: "" };

              return (
                <div
                  key={event.id}
                  className="bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-1">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground">{event.guestName}</p>
                      </div>
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {event.platform}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {ROLE_LABELS[event.guestRole]}
                      </span>
                      <span className="bg-secondary/10 text-secondary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {COUNTRY_LABELS[event.country] || event.country}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-foreground mb-4">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{formatDateTime(event.datetime)}</span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {event.youtubeOrEventUrl && (
                        <Button variant="outline" size="sm" asChild className="gap-1 transition-transform hover:scale-[1.02]">
                          <a
                            href={event.youtubeOrEventUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Video className="h-4 w-4" />
                            لینک لایو
                          </a>
                        </Button>
                      )}
                      
                      {/* Add to Calendar Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1 transition-transform hover:scale-[1.02]">
                            <CalendarPlus className="h-4 w-4" />
                            افزودن به تقویم
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="bg-popover z-50">
                          <DropdownMenuItem asChild>
                            <a
                              href={generateGoogleCalendarUrl(event)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Google Calendar
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => downloadICS(event)}>
                            دانلود فایل ICS (Apple/Outlook)
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        size="sm"
                        variant={isExpanded ? "secondary" : "default"}
                        onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
                        className="transition-transform hover:scale-[1.02]"
                      >
                        {isExpanded ? "بستن فرم" : "ارسال سوال برای این لایو"}
                      </Button>
                    </div>
                  </div>

                  {/* Question Form */}
                  {isExpanded && (
                    <div className="border-t border-border p-6 bg-accent/30 animate-fade-in">
                      <form
                        onSubmit={(e) => handleSubmitQuestion(event.id, e)}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                              نام (اختیاری)
                            </label>
                            <Input
                              value={eventForm.name}
                              onChange={(e) =>
                                updateFormData(event.id, "name", e.target.value)
                              }
                              placeholder="نام شما"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                              تلگرام یا ایمیل
                            </label>
                            <Input
                              value={eventForm.contact}
                              onChange={(e) =>
                                updateFormData(event.id, "contact", e.target.value)
                              }
                              placeholder="@username یا email"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            سوال شما
                          </label>
                          <Textarea
                            value={eventForm.question}
                            onChange={(e) =>
                              updateFormData(event.id, "question", e.target.value)
                            }
                            placeholder="سوالتون رو اینجا بنویسید..."
                            rows={3}
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="gap-2"
                          disabled={submitting === event.id}
                        >
                          <Send className="h-4 w-4" />
                          {submitting === event.id ? "در حال ارسال..." : "ارسال سوال"}
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              در حال حاضر لایوی برنامه‌ریزی نشده. به زودی اعلام می‌کنیم!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
