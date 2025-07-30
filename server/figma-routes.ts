import { Router } from "express";
import { figmaService } from "./figma";
import { z } from "zod";

const router = Router();

// Validation schemas
const fileKeySchema = z.string().min(1, "File key is required");
const nodeIdsSchema = z.array(z.string()).min(1, "At least one node ID is required");

// Get Figma file information
router.get("/figma/file/:fileKey", async (req, res) => {
  try {
    const fileKey = fileKeySchema.parse(req.params.fileKey);
    const file = await figmaService.getFile(fileKey);
    
    res.json({
      success: true,
      data: file,
      message: "File retrieved successfully"
    });
  } catch (error) {
    console.error("Figma file error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to retrieve file",
      code: "FIGMA_FILE_ERROR"
    });
  }
});

// Get specific nodes from a Figma file
router.post("/figma/file/:fileKey/nodes", async (req, res) => {
  try {
    const fileKey = fileKeySchema.parse(req.params.fileKey);
    const { nodeIds } = req.body;
    const validatedNodeIds = nodeIdsSchema.parse(nodeIds);
    
    const nodes = await figmaService.getFileNodes(fileKey, validatedNodeIds);
    
    res.json({
      success: true,
      data: nodes,
      message: "Nodes retrieved successfully"
    });
  } catch (error) {
    console.error("Figma nodes error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to retrieve nodes",
      code: "FIGMA_NODES_ERROR"
    });
  }
});

// Get images from Figma nodes
router.post("/figma/file/:fileKey/images", async (req, res) => {
  try {
    const fileKey = fileKeySchema.parse(req.params.fileKey);
    const { nodeIds, format = 'png', scale = 2 } = req.body;
    const validatedNodeIds = nodeIdsSchema.parse(nodeIds);
    
    const images = await figmaService.getImages(fileKey, validatedNodeIds, format, scale);
    
    res.json({
      success: true,
      data: images,
      message: "Images retrieved successfully"
    });
  } catch (error) {
    console.error("Figma images error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to retrieve images",
      code: "FIGMA_IMAGES_ERROR"
    });
  }
});

// Get components from a Figma file
router.get("/figma/file/:fileKey/components", async (req, res) => {
  try {
    const fileKey = fileKeySchema.parse(req.params.fileKey);
    const components = await figmaService.getComponents(fileKey);
    
    res.json({
      success: true,
      data: components,
      message: "Components retrieved successfully"
    });
  } catch (error) {
    console.error("Figma components error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to retrieve components",
      code: "FIGMA_COMPONENTS_ERROR"
    });
  }
});

// Get styles from a Figma file
router.get("/figma/file/:fileKey/styles", async (req, res) => {
  try {
    const fileKey = fileKeySchema.parse(req.params.fileKey);
    const styles = await figmaService.getStyles(fileKey);
    
    res.json({
      success: true,
      data: styles,
      message: "Styles retrieved successfully"
    });
  } catch (error) {
    console.error("Figma styles error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to retrieve styles",
      code: "FIGMA_STYLES_ERROR"
    });
  }
});

// Sync design system from Figma file
router.post("/figma/sync-design/:fileKey", async (req, res) => {
  try {
    const fileKey = fileKeySchema.parse(req.params.fileKey);
    const designSystem = await figmaService.syncDesignSystem(fileKey);
    
    res.json({
      success: true,
      data: designSystem,
      message: "Design system synced successfully",
      summary: {
        colorsFound: designSystem.colors.length,
        textStylesFound: designSystem.textStyles.length,
        componentsFound: designSystem.components.length
      }
    });
  } catch (error) {
    console.error("Figma sync error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to sync design system",
      code: "FIGMA_SYNC_ERROR"
    });
  }
});

// Generate React component from Figma node
router.post("/figma/generate-component/:fileKey", async (req, res) => {
  try {
    const fileKey = fileKeySchema.parse(req.params.fileKey);
    const { nodeId } = req.body;
    
    if (!nodeId || typeof nodeId !== 'string') {
      return res.status(400).json({
        success: false,
        error: "Node ID is required",
        code: "MISSING_NODE_ID"
      });
    }
    
    const componentCode = await figmaService.generateReactComponent(fileKey, nodeId);
    
    res.json({
      success: true,
      data: {
        code: componentCode,
        nodeId
      },
      message: "React component generated successfully"
    });
  } catch (error) {
    console.error("Figma component generation error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate component",
      code: "FIGMA_GENERATION_ERROR"
    });
  }
});

// Test Figma API connection
router.get("/figma/test-connection", async (req, res) => {
  try {
    // Test with a simple API call
    const response = await fetch('https://api.figma.com/v1/me', {
      headers: {
        'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN || '',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API test failed: ${response.status}`);
    }
    
    const userData = await response.json();
    
    res.json({
      success: true,
      data: {
        connected: true,
        user: userData,
        timestamp: new Date().toISOString()
      },
      message: "Figma connection successful"
    });
  } catch (error) {
    console.error("Figma connection test error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Connection test failed",
      code: "FIGMA_CONNECTION_ERROR"
    });
  }
});

// Master Fees specific: Import dashboard design
router.post("/figma/import-dashboard/:fileKey", async (req, res) => {
  try {
    const fileKey = fileKeySchema.parse(req.params.fileKey);
    
    // Get the full file to analyze structure
    const file = await figmaService.getFile(fileKey);
    
    // Extract dashboard-specific elements
    const dashboardNodes = file.document.children?.filter(node => 
      node.name.toLowerCase().includes('dashboard') ||
      node.name.toLowerCase().includes('master fees')
    ) || [];
    
    const designSystem = await figmaService.syncDesignSystem(fileKey);
    
    res.json({
      success: true,
      data: {
        designSystem,
        dashboardNodes: dashboardNodes.map(node => ({
          id: node.id,
          name: node.name,
          type: node.type
        })),
        fileInfo: {
          name: file.document.name,
          nodeCount: file.document.children?.length || 0
        }
      },
      message: "Dashboard design imported successfully"
    });
  } catch (error) {
    console.error("Dashboard import error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to import dashboard design",
      code: "DASHBOARD_IMPORT_ERROR"
    });
  }
});

export default router;