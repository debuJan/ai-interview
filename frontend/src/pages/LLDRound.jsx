import React, { useState } from "react";
import "../styles/lldround.css";
import VoiceInput from "./VoiceInput";
import { submitAnswerToBackend } from "../utils/submitAnswer";


const lldQuestions = [
{
  title: "Design a Parking Lot System",
  content: (
    <>
      <p>
        Design a system for a multi-level parking lot with support for cars, bikes, and trucks.
      </p>
      <ul>
        <li>Vehicle entry/exit, different spot sizes</li>
        <li>Availability tracking, ticketing system</li>
        <li>Classes: Vehicle, ParkingSpot, Floor, Ticket, ParkingLot</li>
      </ul>

      <h4>🔧 System Design Overview:</h4>
      <p>
        The parking lot system should support multiple vehicle types (Car, Bike, Truck), multiple levels (floors), and dynamic tracking of availability. Upon entry, the system should generate a ticket and assign an appropriate parking spot based on vehicle size.
      </p>

      <h4>📦 Main Components / Classes:</h4>
      <ul>
        <li><b>Vehicle</b> (abstract): car, bike, truck (subclasses)</li>
        <li><b>ParkingSpot</b>: ID, type (small/medium/large), availability, vehicle</li>
        <li><b>Floor</b>: floor number, list of parking spots</li>
        <li><b>Ticket</b>: ticket number, vehicle, timestamp, floor, spot ID</li>
        <li><b>ParkingLot</b>: List of floors, assign/release spot methods, ticket generator</li>
      </ul>

      <h4>💡 Sample Class Design:</h4>
      <pre style={{ background: "#f8f9fa", padding: "0.75rem", borderRadius: "8px", overflowX: "auto" }}>
{`
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
}
`}
      </pre>

      <h4>✅ Functional Requirements:</h4>
      <ul>
        <li>Assign nearest available spot of matching type</li>
        <li>Track occupancy in real-time</li>
        <li>Release and update availability on exit</li>
        <li>Prevent overbooking</li>
      </ul>

      <h4>📌 Notes:</h4>
      <ul>
       <li>Large spots can accommodate smaller vehicles if needed (Truck &gt; Car &gt; Bike)</li>

        <li>Can be extended to support payment integration, sensors, mobile app, etc.</li>
      </ul>

      <blockquote>
        This design is scalable and flexible enough to support real-time entry/exit and availability tracking in a multi-floor parking facility with different vehicle types.
      </blockquote>
    </>
  ),
},

 {
  title: "Design a BookMyShow System",
  content: (
    <>
      <p><strong>Online movie ticket booking system</strong> allowing users to search and book movie shows across multiple theatres.</p>

      <h4>🎯 Key Features:</h4>
      <ul>
        <li>Search movies by city, date, language, or genre</li>
        <li>Browse shows and book available seats</li>
        <li>User login, booking history, and payment integration</li>
        <li>Admin can manage movies, shows, and theatres</li>
      </ul>

      <h4>🧱 Core Entities / Classes:</h4>
      <ul>
        <li><b>User</b>: id, name, email, password, bookings</li>
        <li><b>Movie</b>: id, name, language, genre, duration, rating</li>
        <li><b>Theatre</b>: id, name, location, list of screens</li>
        <li><b>Screen</b>: id, theatreId, seating layout</li>
        <li><b>Show</b>: id, movieId, screenId, startTime, seatAvailability</li>
        <li><b>Seat</b>: id, row, number, type (normal, premium), price</li>
        <li><b>Booking</b>: id, userId, showId, seats[], paymentStatus</li>
      </ul>

      <h4>💡 Sample Workflow:</h4>
      <ol>
        <li>User selects a movie and city</li>
        <li>System fetches all theatres and shows</li>
        <li>User selects showtime and seats</li>
        <li>Booking is created with selected seats</li>
        <li>Payment gateway is triggered</li>
        <li>Upon success, booking is confirmed</li>
      </ol>

      <h4>📌 Notes:</h4>
      <ul>
        <li>Each seat can be locked temporarily during payment</li>
        <li>Real-time concurrency handling is required</li>
        <li>Can use cache (e.g. Redis) for seat availability</li>
      </ul>
    </>
  ),
},

  {
  title: "Design a Rate Limiter",
  content: (
    <>
      <p>
        Design a system to prevent API overuse by controlling the number of requests a user/system can make over a time window.
      </p>

      <h4>🎯 Key Concepts:</h4>
      <ul>
        <li>Prevent DDoS attacks or abuse of resources</li>
        <li>Maintain fairness between users</li>
        <li>Throttle excessive requests</li>
      </ul>

      <h4>📦 Rate Limiting Algorithms:</h4>
      <ul>
        <li><b>Fixed Window:</b> Count requests per time window (e.g., per minute)</li>
        <li><b>Sliding Window:</b> More accurate, uses multiple sub-windows to smooth out spikes</li>
        <li><b>Leaky Bucket:</b> Queue of requests processed at a fixed rate</li>
        <li><b>Token Bucket:</b> Tokens are added at a fixed rate; each request consumes a token</li>
      </ul>

      <h4>🧱 Class Design (Token Bucket Example):</h4>
      <pre style={{ backgroundColor: "#f1f5f9", padding: "10px", borderRadius: "5px", overflowX: "auto" }}>
{`class TokenBucket {
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
}`}
      </pre>

      <h4>📌 Notes:</h4>
      <ul>
        <li>Use Redis or in-memory cache for distributed rate limiting</li>
        <li>Apply per-user or per-IP rate limits</li>
        <li>Include response headers like <code>X-RateLimit-Remaining</code></li>
      </ul>
    </>
  ),
},

  {
  title: "Design a Chat App (like WhatsApp)",
  content: (
    <>
      <p>
        Design a real-time messaging system that supports personal and group conversations, multimedia sharing, and message status tracking.
      </p>

      <h4>🎯 Features:</h4>
      <ul>
        <li>1-on-1 and group messaging</li>
        <li>Typing indicators, online/offline presence</li>
        <li>Delivery & read receipts</li>
        <li>Send text, image, video, documents</li>
        <li>Push notifications</li>
        <li>End-to-end encryption</li>
      </ul>

      <h4>🧱 Entities / Classes:</h4>
      <ul>
        <li><b>User:</b> id, name, phone, profileImage, lastSeen, status</li>
        <li><b>Chat:</b> id, isGroup (true/false), participants[]</li>
        <li><b>Message:</b> id, senderId, chatId, content, timestamp, status (sent, delivered, read), type (text/image/etc)</li>
        <li><b>Group:</b> id, name, members[], admins[]</li>
        <li><b>Attachment:</b> id, messageId, fileUrl, fileType</li>
      </ul>

      <h4>⚙️ Flow:</h4>
      <ol>
        <li>User sends a message via socket</li>
        <li>Server saves it and emits to receiver(s)</li>
        <li>Receiver acknowledges = status becomes 'delivered'</li>
        <li>Upon opening = status becomes 'read'</li>
      </ol>

      <h4>🔐 Security & Scalability:</h4>
      <ul>
        <li>Use end-to-end encryption for message content</li>
        <li>Store files on S3 or Blob storage</li>
        <li>Use Redis for pub/sub messaging</li>
        <li>Scale using WebSockets and sharding for large user bases</li>
      </ul>

      <h4>📌 Tech Stack Suggestions:</h4>
      <ul>
        <li>Frontend: React / Flutter / Swift</li>
        <li>Backend: Node.js / Spring Boot</li>
        <li>Database: MongoDB or PostgreSQL</li>
        <li>Real-time: Socket.io or WebSocket API</li>
      </ul>
    </>
  ),
},

 {
  title: "Design a Notification System",
  content: (
    <>
      <p>
        Design a system that can send notifications via multiple channels (Email, SMS, Push) with features like retry, scheduling, prioritization, and logging.
      </p>

      <h4>🎯 Requirements:</h4>
      <ul>
        <li>Support Email, SMS, and Push notifications</li>
        <li>Scalable and asynchronous delivery</li>
        <li>Retry on failure</li>
        <li>Prioritize urgent notifications</li>
        <li>Schedule future notifications</li>
        <li>Log success and failures</li>
      </ul>

      <h4>🧱 Entities / Classes:</h4>
      <ul>
        <li><b>Notification:</b> id, message, recipient, priority, channel, status, timestamp</li>
        <li><b>Channel Interface:</b> sendNotification(Notification)</li>
        <li><b>EmailChannel:</b> implements Channel</li>
        <li><b>SMSChannel:</b> implements Channel</li>
        <li><b>PushChannel:</b> implements Channel</li>
        <li><b>NotificationService:</b> manages retry, logging, and scheduling</li>
      </ul>

      <h4>🔁 Design Patterns:</h4>
      <ul>
        <li><b>Strategy Pattern</b> – choose the correct channel implementation at runtime</li>
        <li><b>Factory Pattern</b> – create notification objects dynamically</li>
      </ul>

      <h4>⚙️ Flow:</h4>
      <ol>
        <li>User/API triggers a new notification</li>
        <li>Service determines channel (e.g., Email)</li>
        <li>Strategy pattern picks appropriate sender</li>
        <li>Send → Retry if failed (with exponential backoff)</li>
        <li>Log status to DB or ELK stack</li>
      </ol>

      <h4>🛠️ Features to Add:</h4>
      <ul>
        <li>Deduplication to avoid repeated notifications</li>
        <li>User preference management</li>
        <li>Monitoring dashboards (Grafana, Prometheus)</li>
        <li>Dead-letter queue for failed notifications</li>
      </ul>

      <h4>📌 Sample Tech Stack:</h4>
      <ul>
        <li>Backend: Node.js / Spring Boot</li>
        <li>Queue: RabbitMQ / Kafka</li>
        <li>Database: PostgreSQL / MongoDB</li>
        <li>Scheduler: Quartz / cron</li>
      </ul>
    </>
  ),
},

{
  title: "Design a Notification System",
  content: (
    <>
      <p>
        Design a system that can send notifications via multiple channels (Email, SMS, Push) with features like retry, scheduling, prioritization, and logging.
      </p>

      <h4>🎯 Requirements:</h4>
      <ul>
        <li>Support Email, SMS, and Push notifications</li>
        <li>Scalable and asynchronous delivery</li>
        <li>Retry on failure</li>
        <li>Prioritize urgent notifications</li>
        <li>Schedule future notifications</li>
        <li>Log success and failures</li>
      </ul>

      <h4>🧱 Entities / Classes:</h4>
      <ul>
        <li><b>Notification</b>: id, message, recipient, priority, channel, status, timestamp</li>
        <li><b>Channel (interface)</b>: sendNotification(Notification)</li>
        <li><b>EmailChannel</b>: implements Channel</li>
        <li><b>SMSChannel</b>: implements Channel</li>
        <li><b>PushChannel</b>: implements Channel</li>
        <li><b>NotificationService</b>: manages retry, logging, and scheduling</li>
      </ul>

      <h4>🔁 Design Patterns:</h4>
      <ul>
        <li><b>Strategy Pattern</b>: choose the correct channel implementation at runtime</li>
        <li><b>Factory Pattern</b>: create notification/channel instances dynamically</li>
      </ul>

      <h4>⚙️ Flow:</h4>
      <ol>
        <li>User/API triggers a new notification</li>
        <li>Service determines channel (e.g., Email)</li>
        <li>Strategy pattern picks appropriate sender (EmailChannel, SMSChannel)</li>
        <li>Send → Retry if failed (with exponential backoff)</li>
        <li>Log status to DB or ELK stack</li>
      </ol>

      <h4>🛠️ Features to Add:</h4>
      <ul>
        <li>Deduplication to avoid repeated notifications</li>
        <li>User preference management (email only, SMS off, etc.)</li>
        <li>Monitoring dashboards (Grafana, Prometheus)</li>
        <li>Dead-letter queue for failed or max-retry-exceeded notifications</li>
      </ul>

      <h4>📌 Sample Tech Stack:</h4>
      <ul>
        <li><b>Backend:</b> Node.js / Spring Boot</li>
        <li><b>Queue:</b> RabbitMQ / Kafka for async delivery</li>
        <li><b>Database:</b> PostgreSQL / MongoDB</li>
        <li><b>Scheduler:</b> Quartz / cron jobs</li>
      </ul>
    </>
  ),
},

];

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function LLD() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [mockQuestions, setMockQuestions] = useState([]);
  const [currentMockIndex, setCurrentMockIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answerInput, setAnswerInput] = useState("");

  const startMockInterview = () => {
    const shuffled = shuffle(lldQuestions).slice(0, 3); // Pick 3 random questions
    setMockQuestions(shuffled);
    setInterviewStarted(true);
    setCurrentMockIndex(0);
    setAnswers({});
    setAnswerInput("");
  };

  const handleNext = () => {
    setAnswers((prev) => ({
      ...prev,
      [mockQuestions[currentMockIndex].title]: answerInput,
    }));
    setAnswerInput("");

    if (currentMockIndex + 1 < mockQuestions.length) {
      setCurrentMockIndex((prev) => prev + 1);
    } else {
      alert("✅ Mock interview completed!\nCheck your answers in console.");
      console.log("LLD Mock Interview Answers:", {
        ...answers,
        [mockQuestions[currentMockIndex].title]: answerInput,
      });
      setInterviewStarted(false);
    }
  };

  return (
    <div className="lld-layout">
      <aside className="sidebar">
        <h2>LLD Questions</h2>
        <ul>
          {lldQuestions.map((q, index) => (
            <li
              key={index}
              className={selectedQuestion === index ? "active" : ""}
              onClick={() => {
                setSelectedQuestion(index);
                setInterviewStarted(false);
              }}
            >
              {q.title}
            </li>
          ))}
        </ul>
        <button className="start-btn" onClick={startMockInterview}>
          🧠 Start Mock Interview
        </button>
      </aside>

      <main className="main-content">
        {!interviewStarted ? (
          selectedQuestion !== null ? (
            <div className="question-display">
              <h2>{lldQuestions[selectedQuestion].title}</h2>
              <div className="question-content">
                {lldQuestions[selectedQuestion].content}
              </div>
            </div>
          ) : (
            <p className="placeholder">Select a question to view its answer.</p>
          )
        ) : (
          <div className="mock-interview">
            <h2>{mockQuestions[currentMockIndex].title}</h2>
            <div className="question">{mockQuestions[currentMockIndex].content}</div>

            <VoiceInput setText={setAnswerInput} />

            <textarea
              className="lld-answer-box"
              rows={12}
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              placeholder="✍️ Write your LLD design here (class diagram, interactions, etc.)..."
            />

            <button className="next-btn" onClick={handleNext}>
              {currentMockIndex + 1 === mockQuestions.length ? "Finish" : "Next"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
