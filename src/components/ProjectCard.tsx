import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  minInvestment: number;
  roiPercent: number;
  targetAmount: number;
  fundedAmount: number;
  durationMonths: number;
  status: 'active' | 'funded' | 'completed' | 'closed';
  imageUrl?: string;
  createdAt: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const progressPercent = (project.fundedAmount / project.targetAmount) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'funded':
        return 'bg-purple-500';
      case 'completed':
        return 'bg-blue-500';
      case 'closed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-400';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border hover:border-indigo-200 bg-white overflow-hidden">
      <div className="relative h-36 w-full overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
        <img
          src={project.imageUrl || `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&auto=format&q=80`}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&auto=format&q=80`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className={`absolute top-2 right-2 ${getStatusColor(project.status)} shadow-sm text-white text-xs font-medium`}>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </Badge>
      </div>

      <CardHeader className="pb-2 pt-3 px-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <CardTitle className="line-clamp-1 text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{project.title}</CardTitle>
          <Badge variant="outline" className="bg-indigo-50 border-indigo-200 text-indigo-700 text-xs font-medium shrink-0">{project.category}</Badge>
        </div>
        <CardDescription className="line-clamp-2 text-sm text-gray-600">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 pt-2 px-4">
        <div className="space-y-1.5 p-2 rounded-lg bg-indigo-50/50 border border-indigo-100">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600 font-medium">Progress</span>
            <span className="font-semibold text-indigo-600">{progressPercent.toFixed(1)}%</span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatCurrency(project.fundedAmount)}</span>
            <span>{formatCurrency(project.targetAmount)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
            <p className="text-gray-600 text-xs font-medium mb-0.5">ROI</p>
            <p className="font-semibold text-sm text-emerald-600">{project.roiPercent}%</p>
          </div>
          <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-gray-600 text-xs font-medium mb-0.5">Duration</p>
            <p className="font-semibold text-sm text-blue-600">{project.durationMonths} mo</p>
          </div>
          <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 col-span-2">
            <p className="text-gray-600 text-xs font-medium mb-0.5">Min Investment</p>
            <p className="font-semibold text-sm text-amber-700">{formatCurrency(project.minInvestment)}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 px-4 pb-4">
        <Button asChild className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <Link to={`/projects/${project._id}`} className="flex items-center justify-center gap-1.5">
            <span>View Details</span>
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
