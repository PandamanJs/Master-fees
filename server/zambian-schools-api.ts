// Zambian Schools API endpoint
import { Router } from 'express';

const router = Router();

router.get('/schools/zambia', async (req, res) => {
  try {
    const zambianSchools = [
      // LUSAKA PROVINCE
      // Primary Schools - Lusaka
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
      { name: "Garden Compound Primary School", type: "primary", district: "Lusaka Urban" },
      { name: "Kalingalinga Primary School", type: "primary", district: "Lusaka Urban" },

      // Secondary Schools - Lusaka
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
      { name: "Kamwala Secondary School", type: "secondary", district: "Lusaka Urban" },
      { name: "Ng'ombe Secondary School", type: "secondary", district: "Lusaka Urban" },

      // COPPERBELT PROVINCE
      // Primary Schools - Kitwe
      { name: "Kitwe Central Primary School", type: "primary", district: "Kitwe" },
      { name: "Riverside Primary School", type: "primary", district: "Kitwe" },
      { name: "Parklands Primary School", type: "primary", district: "Kitwe" },
      { name: "Mindolo Primary School", type: "primary", district: "Kitwe" },
      { name: "Buchi Primary School", type: "primary", district: "Kitwe" },

      // Secondary Schools - Kitwe
      { name: "Kitwe Boys Secondary School", type: "secondary", district: "Kitwe" },
      { name: "Kitwe Girls Secondary School", type: "secondary", district: "Kitwe" },
      { name: "Mindolo Secondary School", type: "secondary", district: "Kitwe" },
      { name: "Parklands Secondary School", type: "secondary", district: "Kitwe" },
      { name: "Buchi Secondary School", type: "secondary", district: "Kitwe" },

      // Primary Schools - Ndola
      { name: "Ndola Central Primary School", type: "primary", district: "Ndola" },
      { name: "Northrise Primary School", type: "primary", district: "Ndola" },
      { name: "Kanini Primary School", type: "primary", district: "Ndola" },
      { name: "Itawa Primary School", type: "primary", district: "Ndola" },

      // Secondary Schools - Ndola
      { name: "Ndola High School", type: "secondary", district: "Ndola" },
      { name: "Northrise Secondary School", type: "secondary", district: "Ndola" },
      { name: "Kanini Secondary School", type: "secondary", district: "Ndola" },
      { name: "Itawa Secondary School", type: "secondary", district: "Ndola" },

      // Primary Schools - Chingola
      { name: "Chingola Primary School", type: "primary", district: "Chingola" },
      { name: "Nchanga Primary School", type: "primary", district: "Chingola" },
      { name: "Kasompe Primary School", type: "primary", district: "Chingola" },

      // Secondary Schools - Chingola
      { name: "Chingola Secondary School", type: "secondary", district: "Chingola" },
      { name: "Nchanga Secondary School", type: "secondary", district: "Chingola" },
      { name: "Kasompe Secondary School", type: "secondary", district: "Chingola" },

      // Primary Schools - Mufulira
      { name: "Mufulira Primary School", type: "primary", district: "Mufulira" },
      { name: "Kantanshi Primary School", type: "primary", district: "Mufulira" },

      // Secondary Schools - Mufulira
      { name: "Mufulira Secondary School", type: "secondary", district: "Mufulira" },
      { name: "Kantanshi Secondary School", type: "secondary", district: "Mufulira" },

      // SOUTHERN PROVINCE
      // Primary Schools - Livingstone
      { name: "Livingstone Central Primary School", type: "primary", district: "Livingstone" },
      { name: "Linda Primary School", type: "primary", district: "Livingstone" },
      { name: "Dambwa Primary School", type: "primary", district: "Livingstone" },

      // Secondary Schools - Livingstone
      { name: "Livingstone High School", type: "secondary", district: "Livingstone" },
      { name: "Linda Secondary School", type: "secondary", district: "Livingstone" },
      { name: "Dambwa Secondary School", type: "secondary", district: "Livingstone" },

      // Primary Schools - Choma
      { name: "Choma Primary School", type: "primary", district: "Choma" },
      { name: "St. Mary's Primary School Choma", type: "primary", district: "Choma" },

      // Secondary Schools - Choma
      { name: "Choma Secondary School", type: "secondary", district: "Choma" },
      { name: "St. Mary's Secondary School Choma", type: "secondary", district: "Choma" },

      // EASTERN PROVINCE
      // Primary Schools - Chipata
      { name: "Chipata Primary School", type: "primary", district: "Chipata" },
      { name: "Kapata Primary School", type: "primary", district: "Chipata" },

      // Secondary Schools - Chipata
      { name: "Chipata Secondary School", type: "secondary", district: "Chipata" },
      { name: "Kapata Secondary School", type: "secondary", district: "Chipata" },

      // NORTHERN PROVINCE
      // Primary Schools - Kasama
      { name: "Kasama Primary School", type: "primary", district: "Kasama" },
      { name: "Chambeshi Primary School", type: "primary", district: "Kasama" },

      // Secondary Schools - Kasama
      { name: "Kasama Secondary School", type: "secondary", district: "Kasama" },
      { name: "Chambeshi Secondary School", type: "secondary", district: "Kasama" },

      // WESTERN PROVINCE
      // Primary Schools - Mongu
      { name: "Mongu Primary School", type: "primary", district: "Mongu" },
      { name: "Lealui Primary School", type: "primary", district: "Mongu" },

      // Secondary Schools - Mongu
      { name: "Mongu Secondary School", type: "secondary", district: "Mongu" },
      { name: "Lealui Secondary School", type: "secondary", district: "Mongu" },

      // NORTH-WESTERN PROVINCE
      // Primary Schools - Solwezi
      { name: "Solwezi Primary School", type: "primary", district: "Solwezi" },
      { name: "Kyawama Primary School", type: "primary", district: "Solwezi" },

      // Secondary Schools - Solwezi
      { name: "Solwezi Secondary School", type: "secondary", district: "Solwezi" },
      { name: "Kyawama Secondary School", type: "secondary", district: "Solwezi" },

      // CENTRAL PROVINCE
      // Primary Schools - Kabwe
      { name: "Kabwe Primary School", type: "primary", district: "Kabwe" },
      { name: "Bwacha Primary School", type: "primary", district: "Kabwe" },

      // Secondary Schools - Kabwe
      { name: "Kabwe High School", type: "secondary", district: "Kabwe" },
      { name: "Bwacha Secondary School", type: "secondary", district: "Kabwe" },

      // LUAPULA PROVINCE
      // Primary Schools - Mansa
      { name: "Mansa Primary School", type: "primary", district: "Mansa" },
      { name: "Cha Cha Cha Primary School", type: "primary", district: "Mansa" },

      // Secondary Schools - Mansa
      { name: "Mansa Secondary School", type: "secondary", district: "Mansa" },
      { name: "Cha Cha Cha Secondary School", type: "secondary", district: "Mansa" },

      // MUCHINGA PROVINCE
      // Primary Schools - Chinsali
      { name: "Chinsali Primary School", type: "primary", district: "Chinsali" },
      { name: "Ilondola Primary School", type: "primary", district: "Chinsali" },

      // Secondary Schools - Chinsali
      { name: "Chinsali Secondary School", type: "secondary", district: "Chinsali" },
      { name: "Ilondola Secondary School", type: "secondary", district: "Chinsali" },

      // INTERNATIONAL AND PRIVATE SCHOOLS (Major Cities)
      { name: "International School of Lusaka", type: "international", district: "Lusaka Urban" },
      { name: "American International School of Lusaka", type: "international", district: "Lusaka Urban" },
      { name: "Lusaka International Community School", type: "international", district: "Lusaka Urban" },
      { name: "Rhodes Park School", type: "private", district: "Lusaka Urban" },
      { name: "Baobab College", type: "private", district: "Lusaka Urban" },
      { name: "Chengelo School", type: "private", district: "Lusaka Urban" },
      { name: "Hillcrest School", type: "private", district: "Lusaka Urban" },
      { name: "Birdcage School", type: "private", district: "Lusaka Urban" },
      { name: "Lechwe School", type: "private", district: "Lusaka Urban" },
      { name: "Forest Hills International School", type: "international", district: "Kitwe" },
      { name: "Copperfield College", type: "private", district: "Kitwe" },
      { name: "Nkana Trust School", type: "private", district: "Kitwe" },
      { name: "St. Antony's School", type: "private", district: "Ndola" },

      // UNIVERSITIES AND COLLEGES
      { name: "University of Zambia", type: "university", district: "Lusaka Urban" },
      { name: "Cavendish University Zambia", type: "university", district: "Lusaka Urban" },
      { name: "Lusaka Apex Medical University", type: "university", district: "Lusaka Urban" },
      { name: "University of Lusaka", type: "university", district: "Lusaka Urban" },
      { name: "Zambia Open University", type: "university", district: "Lusaka Urban" },
      { name: "Copperbelt University", type: "university", district: "Kitwe" },
      { name: "Mulungushi University", type: "university", district: "Kabwe" },
      { name: "Kwame Nkrumah University", type: "university", district: "Kabwe" },
      { name: "Livingstone International University of Tourism Excellence and Business Management", type: "university", district: "Livingstone" },
      { name: "Natural Resources Development College", type: "college", district: "Lusaka Urban" },
      { name: "Evelyn Hone College", type: "college", district: "Lusaka Urban" },
      { name: "Zambia Institute of Business Studies", type: "college", district: "Lusaka Urban" },
      { name: "Northern Technical College", type: "college", district: "Ndola" },
      { name: "Copperbelt Secondary Teachers College", type: "college", district: "Kitwe" },
      { name: "Chipata Trades Training Institute", type: "college", district: "Chipata" },

      // TECHNICAL AND VOCATIONAL SCHOOLS
      { name: "Lusaka Trades Training Institute", type: "technical", district: "Lusaka Urban" },
      { name: "Zambia Centre for Accountancy Studies", type: "technical", district: "Lusaka Urban" },
      { name: "Lusaka Business and Technical College", type: "technical", district: "Lusaka Urban" },
      { name: "Kitwe Trades Training Institute", type: "technical", district: "Kitwe" },
      { name: "Ndola Trades Training Institute", type: "technical", district: "Ndola" },
      { name: "Livingstone Trades Training Institute", type: "technical", district: "Livingstone" },
      { name: "Kabwe Trades Training Institute", type: "technical", district: "Kabwe" },
      { name: "Solwezi Trades Training Institute", type: "technical", district: "Solwezi" },
      { name: "Mongu Trades Training Institute", type: "technical", district: "Mongu" },
      { name: "Kasama Trades Training Institute", type: "technical", district: "Kasama" },
    ];

    // Filter schools based on query parameter if provided
    const query = req.query.q as string;
    let filteredSchools = zambianSchools;
    
    if (query) {
      filteredSchools = zambianSchools.filter(school => 
        school.name.toLowerCase().includes(query.toLowerCase()) ||
        school.district.toLowerCase().includes(query.toLowerCase()) ||
        school.type.toLowerCase().includes(query.toLowerCase())
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