GearGuard: Industrial Maintenance Management System

GearGuard is a specialized maintenance management platform (CMMS) built with the Node.js, Express, and MongoDB (MEN stack). It streamlines industrial workflows by automating equipment status updates, tracking routine checkups via a Kanban board, and enforcing "Scrap" logic for end-of-life assets.

Key Features
1. Smart Kanban Workflow
Dynamic Stages: Tracks requests through New, In Progress, Repaired, and Scrap.

Overdue Alerts: Automatically flags maintenance tasks as OVERDUE if the scheduled date has passed and the task is not completed.

Visual Priority: Categorizes tasks into Corrective (Breakdown) and Preventive (Routine) using color-coded card borders.

2. "Point of No Return" Scrap Logic
Asset Decommissioning: Once a technician moves a maintenance request to the Scrap stage, the underlying equipment is automatically marked as isUsable: false.

Safety Locks: Scrapped equipment is automatically filtered out of new maintenance forms, preventing accidental scheduling for decommissioned assets.

Immutable State: The UI locks the Kanban card once scrapped to prevent stage reversals.

3. Equipment Integration
Smart Buttons: Direct integration from the Equipment view to filtered Maintenance views.

Auto-fill Data: New requests automatically fetch the assigned Maintenance Team and Technician based on the selected equipment.

Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (using Mongoose ODM)

Templating: EJS (Embedded JavaScript) with EJS-Mate for layouts

Styling: Bootstrap 5

Methodology: RESTful Routing
