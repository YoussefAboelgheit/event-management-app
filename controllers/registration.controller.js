import Registration from "../models/registration.js";
import Event from "../models/event.js";

export const createRegistration = async (req, res) => {
  const { event_id, user_id } = req.body;
  
  const event = await Event.findById(event_id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const existingRegistration = await Registration.findOne({ event_id, user_id });
  if (existingRegistration) {
    return res.status(400).json({ message: `User with id: ${user_id} is already registered for this event` });
  }

  const currentCount = await Registration.countDocuments({ event_id });
  if (currentCount >= event.capacityLimit) {
    return res.status(400).json({ message: "Event capacity has been reached" });
  }

  const registration = await Registration.create(req.body);
  res.status(201).json(registration);
};

export const getRegistrations = async (req, res) => {
  // 1. Find all events created by the logged-in user
  const userEvents = await Event.find({ user_id: req.user.userId }).select("_id");
  const eventObjectIds = userEvents.map(e => e._id); // Keep as ObjectId for Mongoose querying
  const eventIdsStrings = eventObjectIds.map(id => id.toString());

  const { event_id } = req.query;

  // If a specific event is requested, ensure the user created it
  if (event_id && !eventIdsStrings.includes(event_id)) {
    return res.status(403).json({ message: "You are not authorized to view registrations for this event" });
  }

  // 2. Fetch registrations only for those events (or the specific one)
  const filter = { event_id: event_id ? event_id : { $in: eventObjectIds } };

  const registrations = await Registration.find(filter)
    .populate("event_id")
    .populate("user_id") // This populates the registered user's details
    .sort({ createdAt: -1 });
    
  res.json(registrations);
};

export const getRegistrationById = async (req, res) => {
  const registration = await Registration.findById(req.params.id)
    .populate("event_id")
    .populate("user_id");
    
  if (!registration) {
    return res.status(404).json({ message: "Registration not found" });
  }

  // Ensure the logged-in user is the creator of the event this registration is for
  if (registration.event_id.user_id.toString() !== req.user.userId) {
    return res.status(403).json({ message: "You are not authorized to view this registration" });
  }

  res.json(registration);
};

export const updateRegistration = async (req, res) => {
  let registration = await Registration.findById(req.params.id);
  if (!registration) {
    return res.status(404).json({ message: "Registration not found" });
  }

  // Assign new fields
  Object.assign(registration, req.body);
  
  // Force version increment
  registration.increment();
  
  await registration.save();
  res.json(registration);
};

export const deleteRegistration = async (req, res) => {
  const registration = await Registration.findByIdAndDelete(req.params.id);
  if (!registration) {
    return res.status(404).json({ message: "Registration not found" });
  }
  res.json({ message: "Registration deleted successfully" });
};
