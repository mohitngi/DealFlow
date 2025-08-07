"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  X,
  User as UserIcon,
  Building2,
  DollarSign,
  TrendingUp,
  FileText,
  MessageCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Upload,
  Eye,
  EyeOff,
  Check,
  Star,
  MapPin,
  Calendar,
  Users,
  BarChart3,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  Plus,
  Filter,
  Search,
  Bell,
  Menu,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface AppUser {
  id: string;
  name: string;
  type: "buyer" | "seller";
  avatar?: string;
  company?: string;
  location?: string;
  industry?: string;
  budget?: string;
  revenue?: string;
  employees?: string;
  description?: string;
  verified?: boolean;
  lastActive?: string;
  interests?: string[];
  dealPreferences?: string[];
}

interface Match {
  id: string;
  user: AppUser;
  matchedAt: string;
  status: "new" | "chatting" | "negotiating" | "completed";
  lastMessage?: string;
  lastMessageAt?: string;
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

interface FormField {
  id: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "select"
    | "textarea"
    | "number"
    | "multiselect";
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

interface AppDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: "analyzing" | "analyzed" | "error";
  summary?: string;
  keyMetrics?: { [key: string]: string };
}

// Components
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
  }
>(({ className, variant = "default", size = "md", ...props }, ref) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  } as const;

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-8",
  } as const;

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const Card = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  >
    {children}
  </div>
);

const Badge = ({
  className,
  children,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "destructive" | "outline";
}) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground border border-input",
  } as const;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Swipeable Card Component
const SwipeableCard = ({
  user,
  onSwipe,
}: {
  user: AppUser;
  onSwipe: (direction: "left" | "right") => void;
}) => {
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(
    null
  );

  const handleDrag = (_event: any, info: any) => {
    setDragDirection(info.offset.x > 0 ? "right" : "left");
  };

  const handleDragEnd = (_event: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(dragDirection || "left");
    } else {
      setDragDirection(null);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      whileDrag={{ scale: 1.05 }}
      exit={{
        x: dragDirection === "right" ? 300 : -300,
        rotate: dragDirection === "right" ? 20 : -20,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
    >
      <Card className="h-full w-full overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="relative h-full p-6">
          {/* Swipe Indicators */}
          {dragDirection && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div
                className={cn(
                  "rounded-full p-4",
                  dragDirection === "right" ? "bg-green-500/20" : "bg-red-500/20"
                )}
              >
                {dragDirection === "right" ? (
                  <Heart className="h-12 w-12 text-green-500" />
                ) : (
                  <X className="h-12 w-12 text-red-500" />
                )}
              </div>
            </div>
          )}

          {/* User Info */}
          <div className="flex items-start gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{user.name}</h3>
                {user.verified && <Shield className="h-5 w-5 text-blue-500" />}
              </div>
              <p className="text-muted-foreground">{user.company}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                {user.location}
              </div>
            </div>
          </div>

          {/* Type Badge */}
          <Badge variant={user.type === "buyer" ? "default" : "secondary"} className="mb-4">
            {user.type === "buyer" ? "Looking to Buy" : "Looking to Sell"}
          </Badge>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-background rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <DollarSign className="h-4 w-4" />
                {user.type === "buyer" ? "Budget" : "Revenue"}
              </div>
              <p className="font-semibold">
                {user.type === "buyer" ? user.budget : user.revenue}
              </p>
            </div>
            <div className="bg-background rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Users className="h-4 w-4" />
                Employees
              </div>
              <p className="font-semibold">{user.employees}</p>
            </div>
          </div>

          {/* Industry */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">Industry</p>
            <Badge variant="outline">{user.industry}</Badge>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">About</p>
            <p className="text-sm leading-relaxed">{user.description}</p>
          </div>

          {/* Interests */}
          {user.interests && user.interests.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Interests</p>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

// Onboarding Component
const OnboardingFlow = ({
  userType,
  onComplete,
}: {
  userType: "buyer" | "seller";
  onComplete: (data: any) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const buyerSteps: OnboardingStep[] = [
    {
      id: "basic",
      title: "Tell us about yourself",
      description: "Help us understand your acquisition goals",
      fields: [
        { id: "name", label: "Full Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "company", label: "Company", type: "text", required: true },
        { id: "location", label: "Location", type: "text", required: true },
      ],
    },
    {
      id: "preferences",
      title: "Acquisition Preferences",
      description: "What type of business are you looking to acquire?",
      fields: [
        {
          id: "budget",
          label: "Budget Range",
          type: "select",
          required: true,
          options: [
            "$100K - $500K",
            "$500K - $1M",
            "$1M - $5M",
            "$5M+",
          ],
        },
        {
          id: "industry",
          label: "Preferred Industry",
          type: "select",
          required: true,
          options: [
            "Technology",
            "Healthcare",
            "Manufacturing",
            "Retail",
            "Services",
            "Other",
          ],
        },
        {
          id: "employees",
          label: "Target Company Size",
          type: "select",
          required: true,
          options: ["1-10", "11-50", "51-200", "200+"],
        },
        {
          id: "interests",
          label: "Specific Interests",
          type: "multiselect",
          options: [
            "SaaS",
            "E-commerce",
            "Mobile Apps",
            "AI/ML",
            "Fintech",
            "Healthtech",
          ],
        },
      ],
    },
    {
      id: "experience",
      title: "Your Experience",
      description: "Tell us about your background",
      fields: [
        {
          id: "experience",
          label: "Previous M&A Experience",
          type: "select",
          options: [
            "First-time buyer",
            "1-2 deals",
            "3-5 deals",
            "5+ deals",
          ],
        },
        {
          id: "timeline",
          label: "Acquisition Timeline",
          type: "select",
          options: [
            "Immediately",
            "3-6 months",
            "6-12 months",
            "12+ months",
          ],
        },
        { id: "description", label: "Tell us more about your goals", type: "textarea" },
      ],
    },
  ];

  const sellerSteps: OnboardingStep[] = [
    {
      id: "basic",
      title: "Business Information",
      description: "Tell us about your business",
      fields: [
        { id: "name", label: "Your Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "company", label: "Business Name", type: "text", required: true },
        { id: "location", label: "Business Location", type: "text", required: true },
      ],
    },
    {
      id: "business",
      title: "Business Details",
      description: "Help buyers understand your business",
      fields: [
        {
          id: "industry",
          label: "Industry",
          type: "select",
          required: true,
          options: [
            "Technology",
            "Healthcare",
            "Manufacturing",
            "Retail",
            "Services",
            "Other",
          ],
        },
        {
          id: "revenue",
          label: "Annual Revenue",
          type: "select",
          required: true,
          options: [
            "Under $100K",
            "$100K - $500K",
            "$500K - $1M",
            "$1M - $5M",
            "$5M+",
          ],
        },
        {
          id: "employees",
          label: "Number of Employees",
          type: "select",
          required: true,
          options: ["1-10", "11-50", "51-200", "200+"],
        },
        { id: "founded", label: "Year Founded", type: "number" },
      ],
    },
    {
      id: "sale",
      title: "Sale Information",
      description: "Details about the sale",
      fields: [
        {
          id: "asking_price",
          label: "Asking Price Range",
          type: "select",
          options: ["$100K - $500K", "$500K - $1M", "$1M - $5M", "$5M+"],
        },
        {
          id: "reason",
          label: "Reason for Selling",
          type: "select",
          options: [
            "Retirement",
            "New Opportunity",
            "Health Reasons",
            "Partnership",
            "Other",
          ],
        },
        {
          id: "timeline",
          label: "Sale Timeline",
          type: "select",
          options: [
            "Immediately",
            "3-6 months",
            "6-12 months",
            "12+ months",
          ],
        },
        { id: "description", label: "Business Description", type: "textarea", required: true },
      ],
    },
  ];

  const steps = userType === "buyer" ? buyerSteps : sellerSteps;
  const currentStepData = steps[currentStep];

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({ ...formData, type: userType });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">
            {userType === "buyer" ? "Buyer" : "Seller"} Onboarding
          </h1>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-2 00 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{currentStepData.title}</h2>
          <p className="text-muted-foreground">{currentStepData.description}</p>
        </div>

        <div className="space-y-4">
          {currentStepData.fields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === "text" || field.type === "email" || field.type === "number" ? (
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, (e.target as HTMLInputElement).value)}
                />
              ) : field.type === "textarea" ? (
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, (e.target as HTMLTextAreaElement).value)}
                />
              ) : field.type === "select" ? (
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, (e.target as HTMLSelectElement).value)}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "multiselect" ? (
                <div className="grid grid-cols-2 gap-2">
                  {field.options?.map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={(formData[field.id] || []).includes(option)}
                        onChange={(e) => {
                          const current = formData[field.id] || [];
                          if (e.target.checked) {
                            handleInputChange(field.id, [...current, option]);
                          } else {
                            handleInputChange(
                              field.id,
                              current.filter((item: string) => item !== option)
                            );
                          }
                        }}
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext}>
          {currentStep === steps.length - 1 ? "Complete" : "Next"}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// Profile Card Component
const ProfileCard = ({
  user,
  onAction,
}: {
  user: AppUser;
  onAction: (action: "like" | "pass" | "view") => void;
}) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{user.name}</h3>
              {user.verified && <Shield className="h-4 w-4 text-blue-500" />}
            </div>
            <p className="text-sm text-muted-foreground">{user.company}</p>
          </div>
        </div>
        <Badge variant={user.type === "buyer" ? "default" : "secondary"}>
          {user.type === "buyer" ? "Buyer" : "Seller"}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground">
            {user.type === "buyer" ? "Budget" : "Revenue"}
          </p>
          <p className="font-medium">
            {user.type === "buyer" ? user.budget : user.revenue}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Industry</p>
          <p className="font-medium">{user.industry}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {user.description}
      </p>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => onAction("view")} className="flex-1">
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
        <Button size="sm" variant="outline" onClick={() => onAction("pass")}>
          <X className="h-4 w-4" />
        </Button>
        <Button size="sm" onClick={() => onAction("like")}>
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

// Document Analyzer Component
const DocumentAnalyzer = ({
  documents,
  onUpload,
}: {
  documents: AppDocument[];
  onUpload: (file: File) => void;
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(onUpload);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">AI Document Analyzer</h2>
        <Badge variant="outline" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <Zap className="h-3 w-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">Upload Financial Documents</h3>
        <p className="text-muted-foreground mb-4">
          Drop your P&L, balance sheets, or other financial documents here
        </p>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Choose Files
        </Button>
      </div>

      {/* Documents List */}
      {documents.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Uploaded Documents</h3>
          {documents.map((doc) => (
            <Card key={doc.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    doc.status === "analyzed"
                      ? "default"
                      : doc.status === "analyzing"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {doc.status === "analyzing" && (
                    <Clock className="h-3 w-3 mr-1 animate-spin" />
                  )}
                  {doc.status}
                </Badge>
              </div>

              {doc.status === "analyzed" && doc.summary && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium mb-2">AI Summary</h5>
                  <p className="text-sm text-muted-foreground mb-3">{doc.summary}</p>

                  {doc.keyMetrics && (
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(doc.keyMetrics).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-xs text-muted-foreground">{key}</p>
                          <p className="font-medium">{value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Platform Component
const BusinessAcquisitionPlatform = () => {
  const [currentView, setCurrentView] = useState<
    "onboarding" | "dashboard" | "swipe" | "matches" | "profile" | "documents" | "settings"
  >("onboarding");
  const [userType, setUserType] = useState<"buyer" | "seller">("buyer");
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [documents, setDocuments] = useState<AppDocument[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Sample data
  const sampleUsers: AppUser[] = [
    {
      id: "1",
      name: "Sarah Chen",
      type: "seller",
      company: "TechFlow Solutions",
      location: "San Francisco, CA",
      industry: "Technology",
      revenue: "$2.5M",
      employees: "25",
      description:
        "Profitable SaaS company serving enterprise clients with automated workflow solutions. Strong recurring revenue and growing customer base.",
      verified: true,
      interests: ["SaaS", "Enterprise", "Automation"],
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      type: "buyer",
      company: "Growth Capital Partners",
      location: "Austin, TX",
      industry: "Investment",
      budget: "$1M - $5M",
      employees: "15",
      description:
        "Experienced investor looking for profitable tech companies with strong growth potential. Focus on B2B SaaS and fintech.",
      verified: true,
      interests: ["SaaS", "Fintech", "B2B"],
      lastActive: "1 hour ago",
    },
    {
      id: "3",
      name: "Jennifer Walsh",
      type: "seller",
      company: "Coastal Manufacturing",
      location: "Portland, OR",
      industry: "Manufacturing",
      revenue: "$8M",
      employees: "45",
      description:
        "Family-owned manufacturing business specializing in sustainable packaging solutions. Established client relationships and steady growth.",
      verified: true,
      interests: ["Manufacturing", "Sustainability", "B2B"],
      lastActive: "30 minutes ago",
    },
  ];

  const sampleDocuments: AppDocument[] = [
    {
      id: "1",
      name: "P&L Statement 2023.pdf",
      type: "financial",
      uploadedAt: "2024-01-15",
      status: "analyzed",
      summary:
        "Strong financial performance with 25% YoY revenue growth. Healthy profit margins and consistent cash flow.",
      keyMetrics: {
        Revenue: "$2.5M",
        "Profit Margin": "18%",
        "Growth Rate": "25%",
        "Cash Flow": "Positive",
      },
    },
    {
      id: "2",
      name: "Balance Sheet Q4.pdf",
      type: "financial",
      uploadedAt: "2024-01-10",
      status: "analyzing",
    },
  ];

  useEffect(() => {
    setUsers(sampleUsers);
    setDocuments(sampleDocuments);
  }, []);

  const handleOnboardingComplete = (data: any) => {
    const newUser: AppUser = {
      id: Date.now().toString(),
      ...data,
      verified: false,
      lastActive: "Just now",
    };
    setCurrentUser(newUser);
    setCurrentView("dashboard");
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right" && users[currentCardIndex]) {
      // Create a match
      const newMatch: Match = {
        id: Date.now().toString(),
        user: users[currentCardIndex],
        matchedAt: new Date().toISOString(),
        status: "new",
      };
      setMatches((prev) => [...prev, newMatch]);
    }

    setCurrentCardIndex((prev) => prev + 1);
  };

  const handleDocumentUpload = (file: File) => {
    const newDoc: AppDocument = {
      id: Date.now().toString(),
      name: file.name,
      type: "financial",
      uploadedAt: new Date().toISOString(),
      status: "analyzing",
    };
    setDocuments((prev) => [...prev, newDoc]);

    // Simulate AI analysis
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === newDoc.id
            ? {
                ...doc,
                status: "analyzed",
                summary:
                  "Document analyzed successfully. Key financial metrics extracted.",
                keyMetrics: { Status: "Processed", Confidence: "95%" },
              }
            : doc
        )
      );
    }, 3000);
  };

  // Navigation
  const NavButton = ({
    icon: Icon,
    label,
    view,
    active,
  }: {
    icon: any;
    label: string;
    view: string;
    active: boolean;
  }) => (
    <button
      onClick={() => setCurrentView(view as any)}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors w-full text-left",
        active ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
      )}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );

  if (currentView === "onboarding") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* User Type Selection */}
          {!currentUser && (
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Welcome to DealFlow</h1>
              <p className="text-xl text-muted-foreground mb-8">
                The modern platform for business acquisitions
              </p>

              <div className="flex gap-4 justify-center mb-8">
                <Card
                  className={cn(
                    "p-6 cursor-pointer transition-all hover:shadow-lg",
                    userType === "buyer" ? "ring-2 ring-blue-500" : ""
                  )}
                  onClick={() => setUserType("buyer")}
                >
                  <UserIcon className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <h3 className="text-lg font-semibold mb-2">I'm a Buyer</h3>
                  <p className="text-sm text-muted-foreground">
                    Looking to acquire a business
                  </p>
                </Card>

                <Card
                  className={cn(
                    "p-6 cursor-pointer transition-all hover:shadow-lg",
                    userType === "seller" ? "ring-2 ring-blue-500" : ""
                  )}
                  onClick={() => setUserType("seller")}
                >
                  <Building2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-lg font-semibold mb-2">I'm a Seller</h3>
                  <p className="text-sm text-muted-foreground">
                    Looking to sell my business
                  </p>
                </Card>
              </div>
            </div>
          )}

          <OnboardingFlow userType={userType} onComplete={handleOnboardingComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-blue-600">DealFlow</h1>
            <Badge variant="outline">
              {currentUser?.type === "buyer" ? "Buyer" : "Seller"}
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              {currentUser?.name?.charAt(0) || "U"}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-6">
          <nav className="space-y-2">
            <NavButton icon={Home} label="Dashboard" view="dashboard" active={currentView === "dashboard"} />
            <NavButton icon={Heart} label="Discover" view="swipe" active={currentView === "swipe"} />
            <NavButton icon={MessageCircle} label="Matches" view="matches" active={currentView === "matches"} />
            <NavButton icon={FileText} label="Documents" view="documents" active={currentView === "documents"} />
            <NavButton icon={UserIcon} label="Profile" view="profile" active={currentView === "profile"} />
            <NavButton icon={Settings} label="Settings" view="settings" active={currentView === "settings"} />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentView === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Welcome back, {currentUser?.name}!
                </h2>
                <p className="text-muted-foreground">
                  Here's what's happening with your deals
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Eye className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">Profile Views</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Heart className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{matches.length}</p>
                      <p className="text-sm text-muted-foreground">Matches</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-sm text-muted-foreground">Active Chats</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Matches</h3>
                  <div className="space-y-4">
                    {matches.slice(0, 3).map((match) => (
                      <div key={match.id} className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                          {match.user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{match.user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {match.user.company}
                          </p>
                        </div>
                        <Badge variant="outline">New</Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => setCurrentView("swipe")}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Discover New Opportunities
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => setCurrentView("documents")}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Upload Documents
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => setCurrentView("profile")}
                    >
                      <UserIcon className="h-4 w-4 mr-2" />
                      Update Profile
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {currentView === "swipe" && (
            <div className="max-w-md mx-auto">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold mb-2">Discover Opportunities</h2>
                <p className="text-muted-foreground">Swipe right to like, left to pass</p>
              </div>

              <div className="relative h-[600px]">
                <AnimatePresence>
                  {users.slice(currentCardIndex, currentCardIndex + 3).map((user, index) => (
                    <motion.div
                      key={user.id}
                      className="absolute inset-0"
                      style={{ zIndex: 3 - index }}
                      initial={{ scale: 0.95, y: index * 10 }}
                      animate={{ scale: 1 - index * 0.05, y: index * 10 }}
                    >
                      {index === 0 ? (
                        <SwipeableCard user={user} onSwipe={handleSwipe} />
                      ) : (
                        <Card className="h-full w-full bg-gray-100" />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {currentCardIndex >= users.length && (
                  <Card className="h-full w-full flex items-center justify-center">
                    <div className="text-center">
                      <Star className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
                      <h3 className="text-xl font-semibold mb-2">
                        You're all caught up!
                      </h3>
                      <p className="text-muted-foreground">
                        Check back later for new opportunities
                      </p>
                    </div>
                  </Card>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full h-14 w-14"
                  onClick={() => handleSwipe("left")}
                  disabled={currentCardIndex >= users.length}
                >
                  <X className="h-6 w-6 text-red-500" />
                </Button>
                <Button
                  size="lg"
                  className="rounded-full h-14 w-14"
                  onClick={() => handleSwipe("right")}
                  disabled={currentCardIndex >= users.length}
                >
                  <Heart className="h-6 w-6" />
                </Button>
              </div>
            </div>
          )}

          {currentView === "matches" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Your Matches</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>

              {matches.length === 0 ? (
                <Card className="p-12 text-center">
                  <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold mb-2">No matches yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start swiping to find your perfect business match
                  </p>
                  <Button onClick={() => setCurrentView("swipe")}>
                    Start Discovering
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matches.map((match) => (
                    <ProfileCard
                      key={match.id}
                      user={match.user}
                      onAction={(action) => {
                        if (action === "view") {
                          // Open detailed view
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {currentView === "documents" && (
            <DocumentAnalyzer documents={documents} onUpload={handleDocumentUpload} />
          )}

          {currentView === "profile" && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold">Profile Settings</h2>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input value={currentUser?.name || ""} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <Input value={currentUser?.company || ""} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Input value={currentUser?.location || ""} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Industry</label>
                    <Input value={currentUser?.industry || ""} />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <textarea
                  className="w-full h-32 p-3 border rounded-md"
                  placeholder="Tell others about your business or investment goals..."
                  value={currentUser?.description || ""}
                />
              </Card>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </div>
          )}

          {currentView === "settings" && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold">Settings</h2>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Matches</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you have new matches
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Messages</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new messages
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Privacy</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Online Status</p>
                      <p className="text-sm text-muted-foreground">
                        Let others see when you're active
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Profile Visibility</p>
                      <p className="text-sm text-muted-foreground">
                        Make your profile discoverable
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BusinessAcquisitionPlatform;
