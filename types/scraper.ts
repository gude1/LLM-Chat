export interface ScrapingRequest {
  url: string;
  maxExecutionTime: number;
  filter: boolean;
  store: boolean;
}

export interface ScrapingResult {
  url: string;
  content: string | null;
  error?: string;
}

export interface ScrapingProgress {
  url: string;
  progress: number; // 0-100
  status: "pending" | "loading" | "completed" | "error";
}
