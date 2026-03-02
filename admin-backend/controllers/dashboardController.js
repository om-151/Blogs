const Blog = require("../models/Blog");
const Client = require("../models/Client");
const Comment = require("../models/Comment");
const Contact = require("../models/Contact");
const User = require("../models/User");

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    // Count totals
    const totalBlogs = await Blog.countDocuments();
    const totalClients = await Client.countDocuments();
    const totalComments = await Comment.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const totalAdminUsers = await User.countDocuments();

    // Get published vs draft blogs
    const publishedBlogs = await Blog.countDocuments({ published: true });
    const draftBlogs = totalBlogs - publishedBlogs;

    // Get recent comments (last 7 days for chart)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const commentsPerDay = await Comment.aggregate([
      {
        $match: { createdAt: { $gte: sevenDaysAgo } }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get blogs created per month (last 6 months)
    const sixMonthsAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
    const blogsPerMonth = await Blog.aggregate([
      {
        $match: { createdAt: { $gte: sixMonthsAgo } }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get clients registration per week (last 4 weeks)
    const fourWeeksAgo = new Date(Date.now() - 4 * 7 * 24 * 60 * 60 * 1000);
    const clientsPerWeek = await Client.aggregate([
      {
        $match: { createdAt: { $gte: fourWeeksAgo } }
      },
      {
        $group: {
          _id: {
            $week: "$createdAt"
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get daily visitors count (using contacts as visitor proxy - last 7 days)
    // Use $dayOfWeek (1 = Sunday .. 7 = Saturday) and map to short names below
    const dailyVisitorsAgg = await Contact.aggregate([
      {
        $match: { createdAt: { $gte: sevenDaysAgo } }
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format comments per day with all 7 days
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const formattedCommentsData = days.map((day, idx) => {
      const date = new Date(Date.now() - (6 - idx) * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split("T")[0];
      const found = commentsPerDay.find(d => d._id === dateStr);
      return {
        name: day,
        comments: found ? found.count : 0
      };
    });

    // Format blogs per month
    const formattedBlogsData = blogsPerMonth.map(item => ({
      name: item._id,
      blogs: item.count
    }));

    // Format clients per week
    const formattedClientsData = ["Week 1", "Week 2", "Week 3", "Week 4"].map((week, idx) => {
      const found = clientsPerWeek.find(d => d._id === idx + 1);
      return {
        name: week,
        users: found ? found.count : 0
      };
    });

    // Format daily visitors
    // Map numeric dayOfWeek values to short names (1=Sun .. 7=Sat)
    const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const formattedVisitorsData = weekNames.map((name, idx) => {
      const dayNumber = idx + 1; // 1..7
      const found = dailyVisitorsAgg.find(d => d._id === dayNumber);
      return {
        name,
        visitors: found ? found.count : 0
      };
    });

    return res.status(200).json({
      stats: {
        totalBlogs,
        totalClients,
        totalComments,
        totalContacts,
        totalAdminUsers,
        publishedBlogs,
        draftBlogs
      },
      charts: {
        commentsPerDay: formattedCommentsData,
        blogsPerMonth: formattedBlogsData,
        clientsPerWeek: formattedClientsData,
        dailyVisitors: formattedVisitorsData
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching dashboard stats", error: err.message });
  }
};
