import fetch from 'node-fetch';

export interface FigmaFile {
  document: FigmaNode;
  components: Record<string, FigmaComponent>;
  schemaVersion: number;
  styles: Record<string, FigmaStyle>;
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  backgroundColor?: FigmaColor;
  fills?: FigmaFill[];
  strokes?: FigmaStroke[];
  effects?: FigmaEffect[];
  absoluteBoundingBox?: FigmaBoundingBox;
  constraints?: FigmaConstraints;
  layoutMode?: string;
  itemSpacing?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  cornerRadius?: number;
  characters?: string;
  style?: FigmaTextStyle;
}

export interface FigmaComponent {
  key: string;
  name: string;
  description: string;
  componentSetId?: string;
  documentationLinks: any[];
  remote: boolean;
}

export interface FigmaStyle {
  key: string;
  name: string;
  description: string;
  remote: boolean;
  styleType: string;
}

export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface FigmaFill {
  type: string;
  color?: FigmaColor;
  gradientStops?: FigmaGradientStop[];
}

export interface FigmaStroke {
  type: string;
  color: FigmaColor;
}

export interface FigmaEffect {
  type: string;
  color?: FigmaColor;
  offset?: { x: number; y: number };
  radius: number;
  visible: boolean;
}

export interface FigmaBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FigmaConstraints {
  vertical: string;
  horizontal: string;
}

export interface FigmaTextStyle {
  fontFamily: string;
  fontPostScriptName?: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  lineHeightPx: number;
  textAlignHorizontal: string;
  textAlignVertical: string;
}

export interface FigmaGradientStop {
  position: number;
  color: FigmaColor;
}

export class FigmaService {
  private apiKey: string;
  private baseUrl = 'https://api.figma.com/v1';

  constructor() {
    this.apiKey = process.env.FIGMA_ACCESS_TOKEN || '';
    if (!this.apiKey) {
      throw new Error('FIGMA_ACCESS_TOKEN environment variable is required');
    }
  }

  private async makeRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'X-Figma-Token': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Figma API error details: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Figma API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async getFile(fileKey: string): Promise<FigmaFile> {
    return this.makeRequest(`/files/${fileKey}`);
  }

  async getFileNodes(fileKey: string, nodeIds: string[]): Promise<any> {
    const nodeIdsParam = nodeIds.join(',');
    return this.makeRequest(`/files/${fileKey}/nodes?ids=${nodeIdsParam}`);
  }

  async getImages(fileKey: string, nodeIds: string[], format: 'png' | 'svg' = 'png', scale: number = 2): Promise<any> {
    const nodeIdsParam = nodeIds.join(',');
    return this.makeRequest(`/images/${fileKey}?ids=${nodeIdsParam}&format=${format}&scale=${scale}`);
  }

  async getComponents(fileKey: string): Promise<any> {
    return this.makeRequest(`/files/${fileKey}/components`);
  }

  async getStyles(fileKey: string): Promise<any> {
    return this.makeRequest(`/files/${fileKey}/styles`);
  }

  async getTeamProjects(teamId: string): Promise<any> {
    return this.makeRequest(`/teams/${teamId}/projects`);
  }

  async getProjectFiles(projectId: string): Promise<any> {
    return this.makeRequest(`/projects/${projectId}/files`);
  }

  // Helper methods for Master Fees integration
  extractColors(node: FigmaNode): string[] {
    const colors: string[] = [];
    
    if (node.backgroundColor) {
      colors.push(this.figmaColorToHex(node.backgroundColor));
    }
    
    if (node.fills) {
      node.fills.forEach(fill => {
        if (fill.color) {
          colors.push(this.figmaColorToHex(fill.color));
        }
      });
    }
    
    if (node.children) {
      node.children.forEach(child => {
        colors.push(...this.extractColors(child));
      });
    }
    
    return [...new Set(colors)]; // Remove duplicates
  }

  extractTextStyles(node: FigmaNode): FigmaTextStyle[] {
    const styles: FigmaTextStyle[] = [];
    
    if (node.type === 'TEXT' && node.style) {
      styles.push(node.style);
    }
    
    if (node.children) {
      node.children.forEach(child => {
        styles.push(...this.extractTextStyles(child));
      });
    }
    
    return styles;
  }

  figmaColorToHex(color: FigmaColor): string {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  figmaColorToRgba(color: FigmaColor): string {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    return `rgba(${r}, ${g}, ${b}, ${color.a})`;
  }

  generateTailwindConfig(colors: string[]): Record<string, string> {
    const tailwindColors: Record<string, string> = {};
    
    colors.forEach((color, index) => {
      tailwindColors[`figma-${index + 1}`] = color;
    });
    
    return tailwindColors;
  }

  async syncDesignSystem(fileKey: string): Promise<{
    colors: string[];
    textStyles: FigmaTextStyle[];
    components: any[];
  }> {
    const file = await this.getFile(fileKey);
    const components = await this.getComponents(fileKey);
    
    const colors = this.extractColors(file.document);
    const textStyles = this.extractTextStyles(file.document);
    
    return {
      colors,
      textStyles,
      components: components.meta?.components || [],
    };
  }

  async generateReactComponent(fileKey: string, nodeId: string): Promise<string> {
    const nodeData = await this.getFileNodes(fileKey, [nodeId]);
    const node = nodeData.nodes[nodeId]?.document;
    
    if (!node) {
      throw new Error('Node not found');
    }
    
    return this.nodeToReactComponent(node);
  }

  private nodeToReactComponent(node: FigmaNode): string {
    const componentName = this.sanitizeComponentName(node.name);
    
    let jsx = '';
    let styles = '';
    
    // Generate styles based on node properties
    if (node.backgroundColor) {
      styles += `backgroundColor: '${this.figmaColorToHex(node.backgroundColor)}', `;
    }
    
    if (node.cornerRadius) {
      styles += `borderRadius: '${node.cornerRadius}px', `;
    }
    
    if (node.absoluteBoundingBox) {
      styles += `width: '${node.absoluteBoundingBox.width}px', `;
      styles += `height: '${node.absoluteBoundingBox.height}px', `;
    }
    
    // Generate JSX based on node type
    switch (node.type) {
      case 'TEXT':
        jsx = `<span style={{${styles}}}>${node.characters || ''}</span>`;
        break;
      case 'RECTANGLE':
      case 'FRAME':
        const children = node.children?.map(child => this.nodeToReactComponent(child)).join('\\n') || '';
        jsx = `<div style={{${styles}}}>${children}</div>`;
        break;
      default:
        jsx = `<div style={{${styles}}}></div>`;
    }
    
    return `
import React from 'react';

export default function ${componentName}() {
  return (
    ${jsx}
  );
}
    `.trim();
  }

  private sanitizeComponentName(name: string): string {
    return name
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[0-9]/, 'Component$&')
      .replace(/^./, str => str.toUpperCase());
  }
}

export const figmaService = new FigmaService();