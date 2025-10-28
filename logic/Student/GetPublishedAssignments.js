const Assignment = require('../../helpers/mongoSchema/Assignment');

async function getPublishedAssignments(page = 1, limit = 10) {
    return new Promise(async (resolve, reject) => {
        try {
            const filter = { status: 'published' };
            
            // Calculate pagination
            const skip = (page - 1) * limit;
            
            // Get total count
            const totalCount = await Assignment.countDocuments(filter);
            
            // Get paginated assignments
            const assignments = await Assignment.find(filter)
                .populate('createdBy', 'name')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const totalPages = Math.ceil(totalCount / limit);

            resolve({ 
                assignments,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalCount,
                    limit,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            });
            
        } catch (error) {
            console.error('Get published assignments error:', error);
            reject("Error while fetching assignments")
        }
    })
}

module.exports = getPublishedAssignments;
