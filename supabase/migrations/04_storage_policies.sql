-- Storage policies for stand_images bucket
CREATE POLICY "Public users can view stand images"
ON storage.objects FOR SELECT
USING (bucket_id = 'stand_images');

CREATE POLICY "Authenticated users can upload stand images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'stand_images' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own stand images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'stand_images' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own stand images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'stand_images' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Storage policies for product_images bucket
CREATE POLICY "Public users can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product_images');

CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product_images' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product_images' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product_images' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Storage policies for user_avatars bucket
CREATE POLICY "Public users can view user avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'user_avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'user_avatars' AND
  auth.role() = 'authenticated' AND
  name = auth.uid()::text || '.jpg' OR
  name = auth.uid()::text || '.png' OR
  name = auth.uid()::text || '.jpeg' OR
  name = auth.uid()::text || '.webp'
);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'user_avatars' AND
  auth.role() = 'authenticated' AND
  name = auth.uid()::text || '.jpg' OR
  name = auth.uid()::text || '.png' OR
  name = auth.uid()::text || '.jpeg' OR
  name = auth.uid()::text || '.webp'
);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'user_avatars' AND
  auth.role() = 'authenticated' AND
  name = auth.uid()::text || '.jpg' OR
  name = auth.uid()::text || '.png' OR
  name = auth.uid()::text || '.jpeg' OR
  name = auth.uid()::text || '.webp'
);