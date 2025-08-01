// Lusaka Schools API endpoint
import { Router } from 'express';

const router = Router();

router.get('/schools/lusaka', async (req, res) => {
  try {
    const lusakaSchools = [
      // Primary Schools
      { name: "Lusaka Primary School", type: "primary", district: "Lusaka Urban" },
      { name: "Ridgeway Primary School", type: "primary", district: "Lusaka Urban" },
      { name: "Rhodes Park Primary School", type: "primary", district: "Lusaka Urban" },
      { name: "Kabulonga Primary School", type: "primary", district: "Lusaka Urban" },
      { name: "Woodlands Primary School", type: "primary", district: "Lusaka Urban" },
      { name: "Libala Primary School", type: "primary", district: "Lusaka Urban" },
      { name: "Chelston Primary School", type: "primary", district: "Lusaka Urban" },
      { name: "Northmead Primary School", type: "primary", district: "Lusaka Urban" },
      { name: "Kamwala Primary School", type: "primary", district: "Lusaka Urban" },
      { name: "Chilenje Primary School", type: "primary", district: "Lusaka Urban" },

      // Secondary Schools
      { name: "Lusaka High School", type: "secondary", district: "Lusaka Urban" },
      { name: "David Livingstone High School", type: "secondary", district: "Lusaka Urban" },
      { name: "Munali Boys Secondary School", type: "secondary", district: "Lusaka Urban" },
      { name: "Munali Girls Secondary School", type: "secondary", district: "Lusaka Urban" },
      { name: "Libala High School", type: "secondary", district: "Lusaka Urban" },
      { name: "Kabulonga Boys Secondary School", type: "secondary", district: "Lusaka Urban" },
      { name: "Kabulonga Girls Secondary School", type: "secondary", district: "Lusaka Urban" },
      { name: "Northmead Secondary School", type: "secondary", district: "Lusaka Urban" },
      { name: "Roma Girls Secondary School", type: "secondary", district: "Lusaka Urban" },
      { name: "Matero Boys Secondary School", type: "secondary", district: "Lusaka Urban" },
      { name: "Chilenje Secondary School", type: "secondary", district: "Lusaka Urban" },
      { name: "Chelston Secondary School", type: "secondary", district: "Lusaka Urban" },

      // International and Private Schools
      { name: "International School of Lusaka", type: "international", district: "Lusaka Urban" },
      { name: "American International School of Lusaka", type: "international", district: "Lusaka Urban" },
      { name: "Lusaka International Community School", type: "international", district: "Lusaka Urban" },
      { name: "Rhodes Park School", type: "private", district: "Lusaka Urban" },
      { name: "Baobab College", type: "private", district: "Lusaka Urban" },
      { name: "Chengelo School", type: "private", district: "Lusaka Urban" },
      { name: "Hillcrest School", type: "private", district: "Lusaka Urban" },
      { name: "Birdcage School", type: "private", district: "Lusaka Urban" },

      // Universities and Colleges
      { name: "University of Zambia", type: "university", district: "Lusaka Urban" },
      { name: "Cavendish University Zambia", type: "university", district: "Lusaka Urban" },
      { name: "Lusaka Apex Medical University", type: "university", district: "Lusaka Urban" },
      { name: "University of Lusaka", type: "university", district: "Lusaka Urban" },
      { name: "Zambia Open University", type: "university", district: "Lusaka Urban" },
      { name: "Natural Resources Development College", type: "college", district: "Lusaka Urban" },
      { name: "Evelyn Hone College", type: "college", district: "Lusaka Urban" },
      { name: "Zambia Institute of Business Studies", type: "college", district: "Lusaka Urban" },

      // Technical Schools
      { name: "Lusaka Trades Training Institute", type: "technical", district: "Lusaka Urban" },
      { name: "Zambia Centre for Accountancy Studies", type: "technical", district: "Lusaka Urban" },
      { name: "Lusaka Business and Technical College", type: "technical", district: "Lusaka Urban" },
    ];

    // Filter schools based on query parameter if provided
    const query = req.query.q as string;
    let filteredSchools = lusakaSchools;
    
    if (query) {
      filteredSchools = lusakaSchools.filter(school => 
        school.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    res.json({
      success: true,
      schools: filteredSchools,
      total: filteredSchools.length
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch schools'
    });
  }
});

export default router;