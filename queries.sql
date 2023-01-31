-- Add a roles column to the profiles table and make it an array of text items
alter table profiles add column roles text[];