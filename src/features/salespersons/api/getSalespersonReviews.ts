import { User } from "@/features/users";

import { Salesperson } from "./getSalesperson";

export interface Review {
  id: string;
  authorId: User["id"];
  salespersonId: Salesperson["id"];
  createdAt: string;
  experiencedAt: string;
  msg: string;
  rating: number;
  isVerified: boolean;
}
