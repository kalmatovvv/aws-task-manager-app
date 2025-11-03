variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets mapped to AZ index"
  type        = map(number)
  default = {
    "10.0.1.0/24" = 0
    "10.0.2.0/24" = 1
  }
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "ecr_image_uri" {
  description = "ECR image URI for backend, e.g. 473845347269.dkr.ecr.us-east-1.amazonaws.com/task-backend:latest"
  type        = string
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance"
  type        = string
}

variable "public_subnet_id" {
  description = "Public subnet ID where the EC2 instance will run"
  type        = string
}

variable "ssh_key_name" {
  description = "Name of the SSH key pair for EC2 access"
  type        = string
}

variable "db_password" {
  type      = string
  sensitive = true
}
