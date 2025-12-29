const Paste = require("../models/Paste");
const getNow = require("../utils/getNow");

// Health Check
exports.healthCheck = async (req, res) => {
  try {
    await Paste.findOne();
    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
};

// Create Paste
exports.createPaste = async (req, res) => {
    console.log(req.body);
  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (ttl_seconds && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
    return res.status(400).json({ error: "Invalid ttl_seconds" });
  }

  if (max_views && (!Number.isInteger(max_views) || max_views < 1)) {
    return res.status(400).json({ error: "Invalid max_views" });
  }

  const now = getNow(req);

  const paste = await Paste.create({
    content,
    createdAt: now,
    expiresAt: ttl_seconds ? now + ttl_seconds * 1000 : null,
    maxViews: max_views || null,
  });

 res.status(201).json({
  id: paste._id.toString()
});

};

// Fetch Paste (API)
exports.getPasteApi = async (req, res) => {
  const paste = await Paste.findById(req.params.id);
  if (!paste) return res.status(404).json({ error: "Not found" });

  const now = getNow(req);

  if (paste.expiresAt && now >= paste.expiresAt) {
    return res.status(404).json({ error: "Expired" });
  }

  if (paste.maxViews && paste.viewCount >= paste.maxViews) {
    return res.status(404).json({ error: "View limit exceeded" });
  }

  paste.viewCount += 1;
  await paste.save();

  res.json({
    content: paste.content,
    remaining_views: paste.maxViews
      ? paste.maxViews - paste.viewCount
      : null,
    expires_at: paste.expiresAt
      ? new Date(paste.expiresAt).toISOString()
      : null,
  });
};

// Fetch Paste (HTML)
exports.getPasteHtml = async (req, res) => {
  const paste = await Paste.findById(req.params.id);
  if (!paste) return res.status(404).send("Not Found");

  const now = getNow(req);

  if (paste.expiresAt && now >= paste.expiresAt) {
    return res.status(404).send("Expired");
  }

  if (paste.maxViews && paste.viewCount >= paste.maxViews) {
    return res.status(404).send("View limit exceeded");
  }

  res.send(`
    <html>
      <body>
        <pre>${paste.content.replace(/</g, "&lt;")}</pre>
      </body>
    </html>
  `);
};

