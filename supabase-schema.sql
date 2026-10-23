-- ==============================================================================
-- ShriTattvam E-Commerce Database Schema for Supabase
-- Run this in your Supabase Dashboard -> SQL Editor
-- ==============================================================================

-- 1. Create Profiles Table (Linked to Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS for profiles
alter table public.profiles enable row level security;

-- Profiles Policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. Create Products Table
create table if not exists public.products (
  id bigint primary key,
  name text not null,
  subtitle text,
  description text,
  price numeric not null,
  original_price numeric,
  discount integer default 0,
  image text not null,
  category text not null,
  rating numeric default 4.8,
  reviews integer default 0,
  in_stock boolean default true,
  features jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS for products
alter table public.products enable row level security;

-- Products Policies: Anyone can view products
create policy "Public can view products"
  on public.products for select
  to public
  using (true);

-- 3. Create Orders Table
create table if not exists public.orders (
  id text primary key,
  user_id uuid references auth.users on delete set null,
  customer_name text not null,
  customer_email text not null,
  phone text,
  shipping_address jsonb not null,
  items jsonb not null,
  subtotal numeric not null,
  discount numeric default 0,
  shipping numeric default 0,
  total numeric not null,
  status text default 'Confirmed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS for orders
alter table public.orders enable row level security;

-- Orders Policies
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id or auth.role() = 'anon');

create policy "Anyone can insert an order"
  on public.orders for insert
  to public
  with check (true);

-- 4. Storage Buckets Setup
-- Note: Create buckets 'products' and 'avatars' in Supabase Dashboard -> Storage
-- or run the following inserts if storage schema permissions permit:
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Public Storage Access Policies
create policy "Public Access to Products Bucket"
  on storage.objects for select
  using (bucket_id = 'products');

create policy "Authenticated users can upload to Products Bucket"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'products');
