const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://bmtghldecntlolkdkjqk.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtdGdobGRlY250bG9sa2RranFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMjUxMTEsImV4cCI6MjA1MjYwMTExMX0.VgHPvCeSUnT9NPQwFk77krtkTRaui_aJ72TubTCjcSc";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const { name, ip } = JSON.parse(event.body);

  if (!name || !ip) {
    return { statusCode: 400, body: JSON.stringify({ message: "Name and IP are required." }) };
  }

  try {
    // Check if IP has already selected a number
    const { data: existingUser, error: checkError } = await supabase
      .from("selections")
      .select("*")
      .eq("ip", ip)
      .single();

    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "You have already selected a number." }),
      };
    }

    // Get available numbers
    const { data: availableNumbers, error: fetchError } = await supabase
      .from("selections")
      .select("number");

    const takenNumbers = availableNumbers.map((item) => item.number);
    const allNumbers = [1, 2, 3, 4, 5, 6];
    const remainingNumbers = allNumbers.filter((n) => !takenNumbers.includes(n));

    if (remainingNumbers.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ message: "All numbers are taken." }) };
    }

    // Assign a random number
    const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
    const selectedNumber = remainingNumbers[randomIndex];

    // Save to database
    const { data, error } = await supabase
      .from("selections")
      .insert([{ name, number: selectedNumber, ip }]);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Number assigned!", number: selectedNumber }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occurred.", error: error.message }),
    };
  }
};
