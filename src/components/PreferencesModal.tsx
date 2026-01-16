import { useState } from 'react';
import FormSelect from './FormSelect';

const imgHeader = "/74dbf5b50fe888a77d8d297d1ecfdcbc0bb8769f.jpg";

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PreferencesData) => void;
  isSubmitting?: boolean;
  apiError?: string;
}

export interface PreferencesData {
  learningMode: string;
  interests: string;
  hoursPerWeek: string;
}

export default function PreferencesModal({ isOpen, onClose, onSubmit, isSubmitting = false, apiError }: PreferencesModalProps) {
  const [formData, setFormData] = useState<PreferencesData>({
    learningMode: '',
    interests: '',
    hoursPerWeek: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PreferencesData, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<Record<keyof PreferencesData, string>> = {};
    
    if (!formData.learningMode) {
      newErrors.learningMode = 'Please select your preferred learning mode';
    }
    if (!formData.interests) {
      newErrors.interests = 'Please select your area of interest';
    }
    if (!formData.hoursPerWeek) {
      newErrors.hoursPerWeek = 'Please select how many hours per week you can dedicate';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (field: keyof PreferencesData) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: undefined });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-3 md:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[600px] max-h-[95vh] overflow-hidden flex flex-col">
        <div className="w-full h-[100px] sm:h-[130px] md:h-[150px] lg:h-[160px] overflow-hidden rounded-t-xl sm:rounded-t-2xl bg-gray-100 flex-shrink-0">
          <img 
            src={imgHeader} 
            alt="Engineering workspace" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-3 sm:p-4 md:p-5 flex flex-col gap-2.5 sm:gap-3 md:gap-4 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center flex-shrink-0">
            <h2 className="font-bold text-sm sm:text-base md:text-lg text-[#6c757d]">
              Learning Preferences
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-2.5 md:gap-3">
            <FormSelect
              label="Area of Interest"
              value={formData.interests}
              onChange={handleChange('interests')}
              error={errors.interests}
              options={[
                { value: '', label: 'Select your area of interest' },
                { value: 'electrical', label: 'Electrical' },
                { value: 'mechanical', label: 'Mechanical' },
                { value: 'architectural', label: 'Architectural' },
                { value: 'construction', label: 'Construction' }
              ]}
            />

            <FormSelect
              label="Preferred Learning Mode"
              value={formData.learningMode}
              onChange={handleChange('learningMode')}
              error={errors.learningMode}
              options={[
                { value: '', label: 'Select Learning Mode' },
                { value: 'live', label: 'Live Online Classes' },
                { value: 'self-paced', label: 'Self-Paced Learning' },
                { value: 'recorded', label: 'Recorded Video Courses' },
                { value: 'interactive', label: 'Interactive Online Sessions' },
                { value: 'hybrid-online', label: 'Mixed (Live + Recorded)' }
              ]}
            />

            <FormSelect
              label="Learning hours Per Week"
              value={formData.hoursPerWeek}
              onChange={handleChange('hoursPerWeek')}
              error={errors.hoursPerWeek}
              options={[
                { value: '', label: 'Select hours Per Week' },
                { value: '1-5', label: '1-5 hours' },
                { value: '6-10', label: '6-10 hours' },
                { value: '11-15', label: '11-15 hours' },
                { value: '16-20', label: '16-20 hours' },
                { value: '20+', label: '20+ hours' }
              ]}
            />

            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 rounded-xl">
                <p className="text-xs sm:text-sm">{apiError}</p>
              </div>
            )}

            <div className="flex justify-end mt-1 sm:mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-primary hover:bg-brand-hover disabled:bg-gray-400 disabled:cursor-not-allowed px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-xl transition-colors w-full sm:w-auto">
                <span className="font-semibold text-sm sm:text-base text-white lowercase">
                  {isSubmitting ? 'submitting...' : 'complete registration'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
