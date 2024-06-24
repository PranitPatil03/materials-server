export interface MaterialType {
  name: string;
  technology: "FDM" | "SLA" | "SLS";
  colors: string[];
  pricePerGram: number;
  imageUrl: string;
}
