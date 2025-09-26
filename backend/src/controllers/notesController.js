import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  // res.status(200).send("Yup just fetched the  notes");
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching Allnotes:", error);
    res.status(500).json({ message: error.message });
  }
}

export async function getNoteById(req, res) {
 try {
  const note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.status(200).json(note);
 } catch (error) {
  console.error("Error fetching note:", error);
  res.status(500).json({ message: error.message });
 }

}


export async function createNote(req, res) {
  // res.status(201).json({"message": "Creating a new note"});
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

  const savedNote = await note.save();
    res.status(201).json(savedNote);

  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: error.message });
  }

}


export async function updateNote(req, res) {
  // res.status(200).json({ "message": "updates note" });
  try {
    const {title, content} = req.body;
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});

  if(!updatedNote) {
    return res.status(404).json({message: "Note not found"});
  }
  res.status(200).json(updatedNote);

  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: error.message });
  }
}

export async function deleteNote(req, res) {
  // res.status(200).json({ "message": "Deleted note" });
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote) {
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json({message: "Note deleted successfully"});
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: error.message });
  }
} 