
# EC2 instance running Docker + backend container
resource "aws_instance" "app" {
  ami                    = var.ami_id
  instance_type          = "t3.small"
  subnet_id              = aws_subnet.public["10.0.1.0/24"].id
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2_instance_profile.name
  key_name               = var.ssh_key_name

  user_data = <<-EOF
    #!/bin/bash
              yum update -y
              amazon-linux-extras install docker -y
              service docker start
              usermod -a -G docker ec2-user

              # Login to ECR and pull backend image
              aws ecr get-login-password --region ${var.aws_region} | docker login --username AWS --password-stdin ${var.ecr_image_uri}
              docker pull ${var.ecr_image_uri}

              # Run backend container with database environment variables
              docker run -d --name backend \
                -p 5000:5000 \
                -e DB_HOST="${aws_db_instance.postgres.address}" \
                -e DB_PORT="5432" \
                -e DB_USER="postgres" \
                -e DB_PASS="${var.db_password}" \
                -e DB_NAME="taskdb" \
                -e PORT="5000" \
                -e DB_SSL="true" \
                ${var.ecr_image_uri}
  EOF

  tags = {
    Name = "task-backend-instance"
  }
}
