import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Pagination<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface EmailList {
    id: number;
    title: string;
    subscribers_count?: number;
    subscribers: Subscriber[];
}

export interface Subscriber {
    id: number;
    name: string;
    email: string;
    email_list?: EmailList;
}

export interface EmailTemplate {
    id: number;
    title: string;
    body?: string;
}

export interface Campaign {
    id: number;
    email_list_id: number;
    email_template_id: number;

    name: string;
    name: string;
    subject: string;
    track_click: boolean;
    track_open: boolean;
    body: string;
    created_at: Date;
    updated_at: Date;

    emailList?: EmailList;
    emailTemplate?: EmailTemplate;
}
