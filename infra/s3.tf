resource "aws_s3_bucket" "frontend" {
  bucket = "task-manager-frontend-${random_id.suffix.hex}"

  # keep the bucket private (no public ACL)
  force_destroy = true

  tags = {
    Name = "task-frontend-bucket"
  }
}

resource "aws_s3_bucket_cors_configuration" "frontend_cors" {
  bucket = aws_s3_bucket.frontend.id

  cors_rule {
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]     # or restrict to your domain(s)
    allowed_headers = ["*"]
    max_age_seconds = 3000
  }
}

resource "random_id" "suffix" {
  byte_length = 4
}


resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for task-manager-frontend"
}

resource "aws_s3_bucket_policy" "frontend_policy" {
  bucket = aws_s3_bucket.frontend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontRead"
        Effect    = "Allow"
        Principal = { "AWS" = aws_cloudfront_origin_access_identity.oai.iam_arn }
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.frontend.arn}/*"
      }
    ]
  })
}
