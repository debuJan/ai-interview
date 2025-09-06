// routes/lldQuestions.js
import express from "express";
const router = express.Router();

// ✅ Full LLD Questions (moved from frontend)
const lldQuestions = [
  {
    id: 1,
    title: "Design a Parking Lot System",
    content: {
      description:
        "Design a system for a multi-level parking lot with support for cars, bikes, and trucks.",
      keyPoints: [
        "Vehicle entry/exit, different spot sizes",
        "Availability tracking, ticketing system",
        "Classes: Vehicle, ParkingSpot, Floor, Ticket, ParkingLot"
      ],
      systemOverview:
        "The parking lot system should support multiple vehicle types (Car, Bike, Truck), multiple levels (floors), and dynamic tracking of availability. Upon entry, the system should generate a ticket and assign an appropriate parking spot based on vehicle size.",
      classes: [
        "Vehicle (abstract): car, bike, truck (subclasses)",
        "ParkingSpot: ID, type (small/medium/large), availability, vehicle",
        "Floor: floor number, list of parking spots",
        "Ticket: ticket number, vehicle, timestamp, floor, spot ID",
        "ParkingLot: List of floors, assign/release spot methods, ticket generator"
      ],
      sampleDesign: `
class Vehicle {
  String number;
  VehicleType type;
}

enum VehicleType {
  BIKE, CAR, TRUCK
}

class ParkingSpot {
  String id;
  VehicleType spotType;
  boolean isOccupied;
  Vehicle vehicle;
}

class Floor {
  int floorNumber;
  List<ParkingSpot> spots;
}

class Ticket {
  String ticketId;
  Vehicle vehicle;
  int floorNumber;
  String spotId;
  LocalDateTime entryTime;
}

class ParkingLot {
  List<Floor> floors;

  Ticket assignSpot(Vehicle vehicle);
  void releaseSpot(Ticket ticket);
}`,
      functionalRequirements: [
        "Assign nearest available spot of matching type",
        "Track occupancy in real-time",
        "Release and update availability on exit",
        "Prevent overbooking"
      ],
      notes: [
        "Large spots can accommodate smaller vehicles if needed (Truck > Car > Bike)",
        "Can be extended to support payment integration, sensors, mobile app, etc."
      ]
    }
  },
  {
    id: 2,
    title: "Design a BookMyShow System",
    content: {
      description:
        "Online movie ticket booking system allowing users to search and book movie shows across multiple theatres.",
      keyFeatures: [
        "Search movies by city, date, language, or genre",
        "Browse shows and book available seats",
        "User login, booking history, and payment integration",
        "Admin can manage movies, shows, and theatres"
      ],
      coreEntities: [
        "User: id, name, email, password, bookings",
        "Movie: id, name, language, genre, duration, rating",
        "Theatre: id, name, location, list of screens",
        "Screen: id, theatreId, seating layout",
        "Show: id, movieId, screenId, startTime, seatAvailability",
        "Seat: id, row, number, type (normal, premium), price",
        "Booking: id, userId, showId, seats[], paymentStatus"
      ],
      workflow: [
        "User selects a movie and city",
        "System fetches all theatres and shows",
        "User selects showtime and seats",
        "Booking is created with selected seats",
        "Payment gateway is triggered",
        "Upon success, booking is confirmed"
      ],
      notes: [
        "Each seat can be locked temporarily during payment",
        "Real-time concurrency handling is required",
        "Can use cache (e.g. Redis) for seat availability"
      ]
    }
  },
  {
    id: 3,
    title: "Design a Rate Limiter",
    content: {
      description:
        "Design a system to prevent API overuse by controlling the number of requests a user/system can make over a time window.",
      concepts: [
        "Prevent DDoS attacks or abuse of resources",
        "Maintain fairness between users",
        "Throttle excessive requests"
      ],
      algorithms: [
        "Fixed Window: Count requests per time window",
        "Sliding Window: More accurate, smooths spikes",
        "Leaky Bucket: Queue of requests processed at fixed rate",
        "Token Bucket: Tokens refilled at rate, each request consumes one"
      ],
      classDesign: `
class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate;
    this.lastRefill = Date.now();
  }

  allowRequest() {
    this.refill();
    if (this.tokens > 0) {
      this.tokens--;
      return true;
    }
    return false;
  }

  refill() {
    const now = Date.now();
    const secondsPassed = (now - this.lastRefill) / 1000;
    const tokensToAdd = Math.floor(secondsPassed * this.refillRate);
    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    if (tokensToAdd > 0) this.lastRefill = now;
  }
}`,
      notes: [
        "Use Redis or in-memory cache for distributed rate limiting",
        "Apply per-user or per-IP rate limits",
        "Include response headers like X-RateLimit-Remaining"
      ]
    }
  },
  {
    id: 4,
    title: "Design a Chat App (like WhatsApp)",
    content: {
      description:
        "Real-time messaging system that supports personal and group conversations, multimedia sharing, and message status tracking.",
      features: [
        "1-on-1 and group messaging",
        "Typing indicators, online/offline presence",
        "Delivery & read receipts",
        "Send text, image, video, documents",
        "Push notifications",
        "End-to-end encryption"
      ],
      entities: [
        "User: id, name, phone, profileImage, lastSeen, status",
        "Chat: id, isGroup, participants[]",
        "Message: id, senderId, chatId, content, timestamp, status, type",
        "Group: id, name, members[], admins[]",
        "Attachment: id, messageId, fileUrl, fileType"
      ],
      flow: [
        "User sends a message via socket",
        "Server saves it and emits to receiver(s)",
        "Receiver acknowledges = status delivered",
        "Upon opening = status read"
      ],
      security: [
        "Use end-to-end encryption for message content",
        "Store files on S3 or Blob storage",
        "Use Redis for pub/sub messaging",
        "Scale using WebSockets and sharding"
      ],
      techStack: [
        "Frontend: React / Flutter / Swift",
        "Backend: Node.js / Spring Boot",
        "Database: MongoDB / PostgreSQL",
        "Real-time: Socket.io or WebSocket API"
      ]
    }
  },
  {
    id: 5,
    title: "Design a Notification System",
    content: {
      description:
        "System that can send notifications via Email, SMS, Push with retry, scheduling, prioritization, and logging.",
      requirements: [
        "Support Email, SMS, Push",
        "Scalable and async delivery",
        "Retry on failure",
        "Prioritize urgent notifications",
        "Schedule future notifications",
        "Log success and failures"
      ],
      entities: [
        "Notification: id, message, recipient, priority, channel, status, timestamp",
        "Channel Interface: sendNotification(Notification)",
        "EmailChannel, SMSChannel, PushChannel",
        "NotificationService: manages retry, logging, scheduling"
      ],
      patterns: ["Strategy Pattern", "Factory Pattern"],
      flow: [
        "User/API triggers a notification",
        "Service determines channel",
        "Strategy pattern picks sender",
        "Retry if failed",
        "Log status to DB or ELK"
      ],
      features: [
        "Deduplication",
        "User preference management",
        "Monitoring dashboards",
        "Dead-letter queue for failed messages"
      ],
      techStack: [
        "Backend: Node.js / Spring Boot",
        "Queue: RabbitMQ / Kafka",
        "Database: PostgreSQL / MongoDB",
        "Scheduler: Quartz / cron"
      ]
    }
  }
];

// ✅ Endpoint
router.get("/", (req, res) => {
  res.json(lldQuestions);
});

export default router;


