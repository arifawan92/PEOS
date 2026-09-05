import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qqdpngxfiytevqlqjbrb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZHB3dmd4Zml5dGV2cWxxanJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MzE4MjQsImV4cCI6MjEwNDAwNzgyNH0.xnaGLBr0y1_pOXibsm5WmgJIE_UZsNIT4JVwyLeoWxk'

export const supabase = createClient(supabaseUrl, supabaseKey)