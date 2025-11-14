import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Contact form submitted successfully",
        data: contact,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      } else {
        console.error("Error creating contact:", error);
        res.status(500).json({
          success: false,
          message: "Failed to submit contact form",
        });
      }
    }
  });

  // Get all contacts (for admin purposes - could add auth later)
  app.get("/api/contacts", async (_req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json({
        success: true,
        data: contacts,
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch contacts",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
