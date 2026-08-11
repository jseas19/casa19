import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { ProjectService } from '../../core/services/project.service';
import { AuthService } from '../../core/services/auth.service';
import { Column, Project, ProjectStatus } from '../../core/models/project.model';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
  public projectService = inject(ProjectService);
  public authService = inject(AuthService);

  // Search & Filter state
  public searchQuery = signal<string>('');
  public selectedCategory = signal<string>('all');

  // New Project Modal State
  public showCreateModal = signal<boolean>(false);
  public newProjectTitle = '';
  public newProjectDesc = '';
  public newProjectCategory = 'Angular / Front';
  public newProjectStatus: ProjectStatus = 'backlog';
  public newProjectColor = '#3b82f6';

  // Columns Configuration
  public columns = computed<Column[]>(() => {
    const allProjects = this.projectService.projectsSignal();
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();

    const filtered = allProjects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(query) ||
                            p.description.toLowerCase().includes(query) ||
                            p.category.toLowerCase().includes(query);
      const matchesCat = cat === 'all' || p.category === cat;
      return matchesSearch && matchesCat;
    });

    const getColumnProjects = (status: ProjectStatus) =>
      filtered
        .filter(p => p.status === status)
        .sort((a, b) => a.order - b.order);

    return [
      {
        id: 'backlog',
        title: '📋 Backlog',
        badgeColor: '#64748b',
        projects: getColumnProjects('backlog')
      },
      {
        id: 'in_progress',
        title: '🚀 En Desarrollo',
        badgeColor: '#3b82f6',
        projects: getColumnProjects('in_progress')
      },
      {
        id: 'review',
        title: '🔍 En Revisión',
        badgeColor: '#eab308',
        projects: getColumnProjects('review')
      },
      {
        id: 'done',
        title: '✅ Completados',
        badgeColor: '#10b981',
        projects: getColumnProjects('done')
      }
    ];
  });

  public get ConnectedListIds(): string[] {
    return ['backlog', 'in_progress', 'review', 'done'];
  }

  public drop(event: CdkDragDrop<Project[]>, targetStatus: ProjectStatus): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // Reassign statuses and order indices
    const updatedAllProjects: Project[] = [];
    const columnsData = this.columns();

    columnsData.forEach(col => {
      const colStatus = col.id;
      const list = col.id === targetStatus ? event.container.data : col.projects;

      list.forEach((proj, idx) => {
        updatedAllProjects.push({
          ...proj,
          status: colStatus,
          order: idx + 1
        });
      });
    });

    this.projectService.updateProjectState(updatedAllProjects);
  }

  public openCreateModal(): void {
    this.newProjectTitle = '';
    this.newProjectDesc = '';
    this.newProjectCategory = 'Angular / Front';
    this.newProjectStatus = 'backlog';
    this.newProjectColor = '#3b82f6';
    this.showCreateModal.set(true);
  }

  public closeCreateModal(): void {
    this.showCreateModal.set(false);
  }

  public submitNewProject(): void {
    if (!this.newProjectTitle.trim()) return;

    this.projectService.createProject({
      title: this.newProjectTitle.trim(),
      description: this.newProjectDesc.trim() || 'Sin descripción.',
      status: this.newProjectStatus,
      order: 99,
      category: this.newProjectCategory,
      tagColor: this.newProjectColor
    });

    this.closeCreateModal();
  }

  public removeProject(id?: string | number): void {
    if (id && confirm('¿Estás seguro de eliminar esta tarjeta de proyecto?')) {
      this.projectService.deleteProject(id);
    }
  }
}
