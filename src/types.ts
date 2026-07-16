/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AppConfig {
  name: string;
  birthday: string; // Format: YYYY-MM-DD
  message: string;
  totalImages: number;
  reasons: string[];
  wishes: Array<{ id: number; wish: string; revealed: boolean }>;
  moonWish?: string;
  musicUrl: string;
}
