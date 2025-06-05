import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
// import { AnalysisStatus } from "../../helpers";
import type { AnalysisFormData } from "../../types/analysis";


interface Props {
    analysis: AnalysisFormData;
  }

export const AnalysisCard = ({ analysis }: Props) => {
    const navigate = useNavigate();

    const goToDetails = () => {
        navigate(`/analysis/${analysis.id}`);
      };
  
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
        onClick={goToDetails}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{analysis.name}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{analysis.description}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{new Date(analysis.analysisDate).toLocaleDateString()}</span>
            </div>
          </div>
          {/* <AnalysisStatus status={analysis.status} /> */}
        </div>
        <p className="mt-3 text-gray-700">{analysis.results}</p>
      </motion.div>
    );
  };