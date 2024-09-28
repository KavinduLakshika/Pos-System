const { Op } = require("sequelize");
const Invoice = require("../model/Invoice");

async function getReports(req, res) {
  try {
    const report = {
      lifetimeRevenue: await lifetimeRevenue(),
      revenueToday: await revenueToday(),
      revenueWeek: await revenueWeek(),
      revenueMonth: await revenueMonth(),
      lifetimeSales: await lifetimeSales(),
      salesToday: await salesToday(),
      salesWeek: await salesWeek(),
      salesMonth: await salesMonth(),
      dailyRevenue: await dailyRevenue(),
      dailySales: await dailySales(),
    };

    res.json({ message_type: "success", message: report });
  } catch (error) {
    console.error("Error while fetching reports:", error);
    res.status(500).json({ message_type: "error", message: error.message });
  }
}

// Lifetime Revenue
async function lifetimeRevenue() {
  const result = await Invoice.sum('totalAmount');
  return result || 0;
}

// Lifetime Sales
async function lifetimeSales() {
  const result = await Invoice.count();
  return result || 0;
}

// Today's Revenue
async function revenueToday() {
  const today = new Date();
  const result = await Invoice.sum('totalAmount', {
    where: {
      invoiceDate: {
        [Op.gte]: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        [Op.lt]: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      },
    },
  });
  return result || 0;
}

// Today's Sales
async function salesToday() {
  const today = new Date();
  const result = await Invoice.count({
    where: {
      invoiceDate: {
        [Op.gte]: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        [Op.lt]: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      },
    },
  });
  return result || 0;
}

// Weekly Revenue
async function revenueWeek() {
  const today = new Date();
  const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const result = await Invoice.sum('totalAmount', {
    where: {
      invoiceDate: {
        [Op.gte]: last7Days,
        [Op.lt]: today,
      },
    },
  });
  return result || 0;
}

// Weekly Sales
async function salesWeek() {
  const today = new Date();
  const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const result = await Invoice.count({
    where: {
      invoiceDate: {
        [Op.gte]: last7Days,
        [Op.lt]: today,
      },
    },
  });
  return result || 0;
}

// Monthly Revenue
async function revenueMonth() {
  const today = new Date();
  const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  const result = await Invoice.sum('totalAmount', {
    where: {
      invoiceDate: {
        [Op.gte]: last30Days,
        [Op.lt]: today,
      },
    },
  });
  return result || 0;
}

// Monthly Sales
async function salesMonth() {
  const today = new Date();
  const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  const result = await Invoice.count({
    where: {
      invoiceDate: {
        [Op.gte]: last30Days,
        [Op.lt]: today,
      },
    },
  });
  return result || 0;
}

// Daily Revenue for the Last 7 Days
async function dailyRevenue() {
  const today = new Date();
  const last7Days = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
  const result = [];

  for (let i = 0; i <= 6; i++) {
    const day = new Date(last7Days.getTime() + i * 24 * 60 * 60 * 1000);
    const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

    const revenue = await Invoice.sum('totalAmount', {
      where: {
        invoiceDate: {
          [Op.gte]: dayStart,
          [Op.lt]: dayEnd,
        },
      },
    });

    result.push({
      date: dayStart.toISOString().split('T')[0],
      revenue: revenue || 0,
    });
  }

  return result;
}

// Daily Sales for the Last 7 Days
async function dailySales() {
  const today = new Date();
  const last7Days = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
  const result = [];

  for (let i = 0; i <= 6; i++) {
    const day = new Date(last7Days.getTime() + i * 24 * 60 * 60 * 1000);
    const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

    const sales = await Invoice.count({
      where: {
        invoiceDate: {
          [Op.gte]: dayStart,
          [Op.lt]: dayEnd,
        },
      },
    });

    result.push({
      date: dayStart.toISOString().split('T')[0],
      sales: sales || 0,
    });
  }

  return result;
}

module.exports = {
  getReports,
};
