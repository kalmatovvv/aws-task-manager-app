# AWS Task Manager App

A full-stack task management application deployed on AWS using a production-style architecture.  
Built to deepen real-world experience with **cloud infrastructure, Terraform, containerization, and AWS networking**.

---

## Architecture Overview

![architecture](./assets/Screenshot%202025-11-04%20095820.png)

✅ Static frontend hosted on S3 + served through CloudFront (HTTPS)  
✅ Backend Node.js API containerized in Docker and deployed on EC2 behind ALB  
✅ PostgreSQL database hosted in Amazon RDS (private subnet, no public exposure)  
✅ DNS + SSL via Route 53 + AWS Certificate Manager  
✅ Fully automated deployment using Terraform (VPC, networking, EC2, RDS, ALB, S3, CloudFront, IAM)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vite + React (S3 + CloudFront hosting) |
| Backend | Node.js, Express, Sequelize, Docker |
| Database | Amazon RDS PostgreSQL |
| Infrastructure | Terraform + AWS (VPC, ALB, EC2, RDS, S3, CloudFront, Route53, ACM) |
| CI/CD | (optional future: GitHub Actions → ECR → deploy) |

---

## Security Highlights

- RDS in private subnet (not publicly exposed)
- EC2 only accepts traffic from ALB security group
- S3 bucket not public — accessible only via CloudFront Origin Access
- HTTPS enforced end-to-end (CloudFront → ALB → client browser)
- IAM roles used, no hard-coded AWS keys

---

![app-image](./assets/Screenshot%202025-11-04%20102536.png)
![alb-setup](./assets/Screenshot%202025-11-04%20100455.png)
![alb-security-group](./assets/Screenshot%202025-11-04%20103043.png)

---

## Deployment Flow

```bash
# 1. Build backend image and push to ECR
docker build -t task-backend .
docker push <ECR-URI>/task-backend:latest

# 2. Deploy infrastructure
terraform init
terraform apply -var="ecr_image_uri=<ECR-URI>/task-backend:latest"
