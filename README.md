# MCRH — Business Requirements Document

Version: 1.0
Author: Project Owner
Last Updated: 2025-10-10

## 1. Project Vision

MCRH is a centralized web-based repository management system for Minecraft resource packs (also called texture packs). The application enables authorized users to upload, organize, search, and download resource packs while exposing rich compatibility metadata for Minecraft versions, individual mods, and modpack collections. The product goal is to reduce time spent finding compatible resource packs and avoid version conflicts.

## 2. Key Objectives

- OBJ-01: Centralize storage and management of Minecraft resource packs.
- OBJ-02: Provide multi-dimensional filtering (Minecraft versions, mods, modpacks).
- OBJ-03: Track compatibility metadata for each resource pack.
- OBJ-04: Enable quick discovery and direct download of appropriate packs.
- OBJ-05: Support administrative upload and organization workflows.

## 3. Business Requirements

### A. Resource Pack Management
- A01: Upload System — The system shall allow admin users to upload resource pack files (ZIP format) and attach metadata during upload (name, description, author, tags, compatible versions, mods, modpacks).
- A02: Batch Uploads — The system shall support batch uploads where multiple packs are uploaded together and metadata is captured per pack.
- A03: Edit Metadata — The system shall allow admin users to edit resource pack metadata after upload, including tags, preview images, and description.
- A04: Archive/Delete — The system shall allow admin users to archive or delete obsolete packs.
- A05: Storage Organization — The system shall support organizing packs into collections or categories and detect duplicate uploads (same content, different versions).

### B. Compatibility Tracking
- B01: Minecraft Version Association — The system shall allow associating each resource pack with one or more Minecraft versions (e.g., 1.19.2, 1.20.1) and optionally specify version ranges.
- B02: Mod Tagging — The system shall allow tagging packs with supported mods and specific mod versions.
- B03: Modpack Association — The system shall allow associating packs with known modpack collections (name + version) and support multiple associations per pack.

### C. Search & Filtering
- C01: Multi-Criteria Filtering — The system shall allow users to filter packs by Minecraft version, mod name/version, modpack name/version, pack name, and tags, simultaneously.
- C02: Text Search — The system shall provide text search across pack names, descriptions, and tags with basic relevance sorting.
- C03: Browse Views — The system shall provide grid and list browse views, with quick preview cards showing key metadata (versions, mods, downloads).

### D. Download & Access
- D01: Direct Downloads — The system shall provide secure, direct download links for resource pack files.
- D02: Pack Details — The system shall provide a detail page for each pack showing all metadata, compatibility info, preview images, and download button.

### E. User Interface & UX
- E01: Responsive UI — The user interface shall be responsive and usable on desktop and mobile devices.
- E02: Admin Interface — The system shall provide an admin panel for uploads, bulk edits, and management dashboards.

### F. Technical & Security Requirements
- F01: File Storage Integration — The system shall store resource packs in cloud storage (S3-compatible or similar) and provide secure download URLs.
- F02: Search Performance & Scalability — The system shall support efficient search/filtering and scale to thousands of packs with caching strategies in place.
- F03: Security & Access Control — The system shall provide authentication for admin functions and read-only public access for browsing/downloading. Admin actions require role-based access control.

## 4. Architecture Diagram

```plantuml
@startuml
title MCRH - High Level Component Diagram

package "Frontend" {
	[Public Frontend\n(React, TypeScript, MUI)] as Public
	[Admin Frontend\n(React, TypeScript, MUI)] as Private
}

package "Services" {
	[Backend API\n(FastAPI, Python, Uvicorn)] as Backend
}

package "Persistence" {
	[Relational Database\n(PostgreSQL)] as DB
	[File Storage\n(Local Linux FS)] as FS
}

' Connections
Public --> Backend : HTTPS (read-only public APIs)
Private --> Backend : HTTPS (admin APIs)
Backend --> DB : SQL/ORM
Backend --> FS : PUT/GET (resource pack files)

note right of Backend
	- Auth & RBAC (JWT / OAuth2)
	- Search index (Elasticsearch or Postgres FTS)
	- File signed URL generation (pre-signed URLs or local signed endpoints)
end note

@enduml
```

## 5. Tech Stack

- Frontend (Public & Admin): TypeScript + React with Material UI (MUI)
	- Recommended: Vite for build, React Router for navigation, React Query for data fetching.
	- Serve as static assets behind a CDN or nginx.

- Backend API: FastAPI (Python) running on Uvicorn/Gunicorn
	- Use Pydantic models for request/response validation.
	- Expose REST endpoints for public and admin operations; separate routes or RBAC middleware for admin.

- Database: PostgreSQL
	- Use SQLAlchemy + Alembic for migrations and ORM; store metadata, tags, associations, and audit logs.

- File Storage: Local Linux filesystem (e.g., /var/mcrh/storage)
	- Backend writes and reads files from mounted path; generate signed download endpoints or serve behind nginx.
	- In production consider switching to S3-compatible object storage for scalability.

## Deployment / Dev notes

- Development: a docker-compose with services (frontend dev server, backend, postgres, local file volume) will make onboarding simple.
- Production: containerize backend and frontends; run behind nginx (TLS), use managed Postgres or a hardened PostgreSQL instance, and mount a dedicated persistent volume for file storage. Add regular backups and monitoring for the DB and filesystem.


