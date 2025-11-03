resource "aws_db_subnet_group" "default" {
  name       = "task-db-subnet-group"
  subnet_ids = [for subnet in aws_subnet.public : subnet.id]
}

resource "aws_db_instance" "postgres" {
  identifier             = "task-db-instance"
  engine                 = "postgres"
  engine_version         = "15"
  instance_class         = "db.t3.micro"
  db_name                = "taskdb"
  username               = "postgres"
  password               = random_password.rds.result
  allocated_storage      = 20
  skip_final_snapshot    = true
  publicly_accessible    = true
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.default.name
}

resource "random_password" "rds" {
  length  = 16
  special = false
}
