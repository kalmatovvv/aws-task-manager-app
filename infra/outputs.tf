output "alb_dns" {
  value = aws_lb.app_lb.dns_name
}

output "rds_endpoint" {
  value = aws_db_instance.postgres.address
}

output "s3_bucket" {
  value = aws_s3_bucket.frontend.bucket
}
