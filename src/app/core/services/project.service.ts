import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { Project, ProjectStatus } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly apiUrl = 'http://localhost:1337/api/projects';
  private readonly localStorageKey = 'casa19_projects_cache';

  // Angular Signals for reactive UI state
  public projectsSignal = signal<Project[]>([]);
  public isLoadingSignal = signal<boolean>(false);
  public isBackendConnected = signal<boolean>(false);

  private initialMockProjects: Project[] = [
    {
      id: 'proj-1',
      title: 'Sistema de Gestión Casa 19',
      description: 'Plataforma principal para administración de proyectos y control de acceso.',
      status: 'in_progress',
      order: 1,
      category: 'Angular / Front',
      tagColor: '#3b82f6',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'proj-2',
      title: 'Strapi Headless CMS API',
      description: 'Backend Strapi v5 integrado con PostgreSQL 17.6 en Windows.',
      status: 'in_progress',
      order: 2,
      category: 'Node.js / Backend',
      tagColor: '#8b5cf6',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'proj-3',
      title: 'Modulo de Seguridad JWT',
      description: 'Persistencia de sesión de usuario y autenticación con roles.',
      status: 'backlog',
      order: 1,
      category: 'Seguridad',
      tagColor: '#ef4444',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'proj-4',
      title: 'Diseño Drag & Drop Board',
      description: 'Interfaz gráfica interactiva con tarjetas animadas en tiempo real.',
      status: 'done',
      order: 1,
      category: 'UI / UX Design',
      tagColor: '#10b981',
      updatedAt: new Date().toISOString()
    }
  ];

  constructor(private http: HttpClient) {
    this.loadProjects();
  }

  public loadProjects(): void {
    this.isLoadingSignal.set(true);

    // Attempt to load from Strapi Backend first
    this.http.get<any>(`${this.apiUrl}?sort=order:asc`).pipe(
      tap(response => {
        if (response && response.data) {
          const loadedProjects: Project[] = response.data.map((item: any) => ({
            id: item.id,
            documentId: item.documentId,
            title: item.title || item.attributes?.title,
            description: item.description || item.attributes?.description,
            status: item.status || item.attributes?.status || 'backlog',
            order: item.order || item.attributes?.order || 0,
            category: item.category || item.attributes?.category || 'General',
            tagColor: item.tagColor || item.attributes?.tagColor || '#6366f1',
            updatedAt: item.updatedAt || item.attributes?.updatedAt
          }));
          this.projectsSignal.set(loadedProjects);
          this.saveToLocalCache(loadedProjects);
          this.isBackendConnected.set(true);
        }
        this.isLoadingSignal.set(false);
      }),
      catchError(err => {
        console.warn('Strapi backend offline or initializing. Loading local storage cache...', err);
        this.isBackendConnected.set(false);
        const cached = this.loadFromLocalCache();
        this.projectsSignal.set(cached.length > 0 ? cached : this.initialMockProjects);
        this.isLoadingSignal.set(false);
        return of(null);
      })
    ).subscribe();
  }

  public updateProjectState(updatedProjects: Project[]): void {
    this.projectsSignal.set(updatedProjects);
    this.saveToLocalCache(updatedProjects);

    // If backend is connected, sync updates
    if (this.isBackendConnected()) {
      updatedProjects.forEach(proj => {
        if (proj.documentId || proj.id) {
          const payload = {
            data: {
              title: proj.title,
              description: proj.description,
              status: proj.status,
              order: proj.order,
              category: proj.category,
              tagColor: proj.tagColor
            }
          };
          const targetId = proj.documentId || proj.id;
          this.http.put(`${this.apiUrl}/${targetId}`, payload).subscribe({
            error: e => console.error('Error updating project on Strapi:', e)
          });
        }
      });
    }
  }

  public createProject(newProject: Omit<Project, 'id'>): void {
    const tempId = `proj-${Date.now()}`;
    const fullProject: Project = {
      ...newProject,
      id: tempId,
      updatedAt: new Date().toISOString()
    };

    const current = [...this.projectsSignal(), fullProject];
    this.projectsSignal.set(current);
    this.saveToLocalCache(current);

    if (this.isBackendConnected()) {
      const payload = { data: newProject };
      this.http.post<any>(this.apiUrl, payload).subscribe({
        next: res => {
          if (res?.data) {
            this.loadProjects(); // Reload to get Strapi documentId
          }
        },
        error: err => console.error('Error persisting new project to Strapi:', err)
      });
    }
  }

  public deleteProject(projectId: string | number): void {
    const filtered = this.projectsSignal().filter(p => p.id !== projectId);
    this.projectsSignal.set(filtered);
    this.saveToLocalCache(filtered);

    if (this.isBackendConnected()) {
      this.http.delete(`${this.apiUrl}/${projectId}`).subscribe({
        error: err => console.error('Error deleting project from Strapi:', err)
      });
    }
  }

  private saveToLocalCache(projects: Project[]): void {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  private loadFromLocalCache(): Project[] {
    try {
      const raw = localStorage.getItem(this.localStorageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
