import Event from "../models/event.js";

export const createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json(event);
};

export const getEvents = async (req, res) => {
  const events = await Event.find().populate('category_id', 'name').sort({ date: 1 });
  res.json(events);
};

import Registration from '../models/registration.js';

export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate('category_id', 'name').lean();
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  
  const currentCount = await Registration.countDocuments({ event_id: event._id });
  
  res.json({ ...event, currentCount });
};

export const updateEvent = async (req, res) => {
  let event = await Event.findById(req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  // Assign new fields
  Object.assign(event, req.body);
  
  // Force version increment
  event.increment();
  
  await event.save();
  res.json(event);
};

export const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  
  // Cascade delete all registrations related to this event
  await Registration.deleteMany({ event_id: req.params.id });

  res.json({ message: "Event deleted successfully" });
};
