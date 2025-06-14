
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Plus, BookOpen, Video, FileText, Users, Clock, Award } from 'lucide-react';

interface ELearningProps {
  userType: 'admin' | 'student';
}

const ELearning: React.FC<ELearningProps> = ({ userType }) => {
  const mockCourses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      instructor: 'Dr. Smith',
      students: 28,
      lessons: 12,
      progress: 75,
      image: '/placeholder.svg',
      description: 'Comprehensive course covering calculus and advanced algebra'
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      instructor: 'Prof. Johnson',
      students: 32,
      lessons: 15,
      progress: 60,
      image: '/placeholder.svg',
      description: 'Introduction to mechanics, thermodynamics, and electricity'
    },
    {
      id: 3,
      title: 'Chemistry Lab',
      instructor: 'Ms. Davis',
      students: 25,
      lessons: 10,
      progress: 80,
      image: '/placeholder.svg',
      description: 'Hands-on laboratory experiments and chemical reactions'
    },
    {
      id: 4,
      title: 'Digital Arts',
      instructor: 'Mr. Wilson',
      students: 20,
      lessons: 8,
      progress: 45,
      image: '/placeholder.svg',
      description: 'Creative digital design and multimedia projects'
    }
  ];

  const mockLessons = [
    { id: 1, title: 'Introduction to Limits', duration: '45 min', type: 'video', completed: true },
    { id: 2, title: 'Derivatives and Applications', duration: '60 min', type: 'video', completed: true },
    { id: 3, title: 'Integration Techniques', duration: '50 min', type: 'video', completed: false },
    { id: 4, title: 'Practice Problems Set 1', duration: '30 min', type: 'assignment', completed: false }
  ];

  const AdminView = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">E-Learning Management</h1>
          <p className="text-gray-600">Upload and organize digital learning materials and courses</p>
        </div>
        <Button className="btn-3d">
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-3d">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Enrolled Students</p>
                <p className="text-2xl font-bold">580</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Video Lessons</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <Card key={course.id} className="floating-card">
            <CardHeader>
              <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg mb-4 flex items-center justify-center">
                <GraduationCap className="w-12 h-12 text-blue-600" />
              </div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Instructor:</span>
                  <span>{course.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span>Students:</span>
                  <span>{course.students}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lessons:</span>
                  <span>{course.lessons}</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Button className="w-full btn-3d" size="sm">
                  Manage Course
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const StudentView = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">My Courses</h1>
        <p className="text-gray-600">Access your enrolled courses and learning materials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-3d">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Enrolled Courses</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Study Hours</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="current">Current Lesson</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.slice(0, 3).map((course) => (
              <Card key={course.id} className="floating-card">
                <CardHeader>
                  <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg mb-4 flex items-center justify-center">
                    <GraduationCap className="w-12 h-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Instructor:</span>
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Progress:</span>
                      <span>{course.progress}%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <Button className="w-full btn-3d" size="sm">
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="current" className="space-y-6">
          <Card className="floating-card">
            <CardHeader>
              <CardTitle className="gradient-text">Advanced Mathematics - Current Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${lesson.completed ? 'bg-green-100' : 'bg-blue-100'}`}>
                        {lesson.type === 'video' ? (
                          <Video className={`w-5 h-5 ${lesson.completed ? 'text-green-600' : 'text-blue-600'}`} />
                        ) : (
                          <FileText className={`w-5 h-5 ${lesson.completed ? 'text-green-600' : 'text-blue-600'}`} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{lesson.title}</h4>
                        <p className="text-sm text-gray-600">{lesson.duration}</p>
                      </div>
                    </div>
                    <Button 
                      variant={lesson.completed ? "outline" : "default"}
                      size="sm"
                    >
                      {lesson.completed ? 'Completed' : 'Start'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  return userType === 'admin' ? <AdminView /> : <StudentView />;
};

export default ELearning;
