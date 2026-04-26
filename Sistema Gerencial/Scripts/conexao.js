// api key : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pdWFub2l3dG15Znh0bmltam9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MzQzMTIsImV4cCI6MjA4OTAxMDMxMn0.Otpp90U3lo0ixh7J_3Wb0uT9X6tFtLdc7mFpEb3fT5I
// url https://oiuanoiwtmyfxtnimjoh.supabase.co


const supabaseCliente = window.supabase.createClient(
  "https://oiuanoiwtmyfxtnimjoh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pdWFub2l3dG15Znh0bmltam9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MzQzMTIsImV4cCI6MjA4OTAxMDMxMn0.Otpp90U3lo0ixh7J_3Wb0uT9X6tFtLdc7mFpEb3fT5I"
);

// exporta para outros arquivos
window.supabaseCliente = supabaseCliente;