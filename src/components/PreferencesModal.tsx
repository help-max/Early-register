import { useState } from 'react';
import FormSelect from './FormSelect';

const imgHeader = "/74dbf5b50fe888a77d8d297d1ecfdcbc0bb8769f.webp";

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
  const [selectedCategory, setSelectedCategory] = useState<'design' | 'site-supervision' | ''>('');

  const designOptions = [
    'HVAC',
    'Plumbing',
    'Fire Fighting',
    'Electrical',
    'Light Current',
    'BMS',
    'Architecture',
    'Landscape',
    'Interior design',
    'Structure',
    'Infrastructure civil',
    'Infrastructure dry utilities',
    'Infrastructure wet utilities'
  ];

  const siteSupervisionOptions = [
    'HVAC',
    'Plumbing',
    'Fire Fighting',
    'Electrical',
    'Light Current',
    'BMS',
    'Infrastructure civil',
    'Infrastructure wet utilities',
    'Infrastructure dry utilities',
    'Civil'
  ];

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

    // Format the interests as "category->detail"
    const formattedData = {
      ...formData,
      interests: selectedCategory && formData.interests ? `${selectedCategory}->${formData.interests}` : formData.interests
    };

    onSubmit(formattedData);
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
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700">
                Area of Interest
              </label>
              
              {!selectedCategory ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('design');
                      setFormData({ ...formData, interests: '' });
                    }}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-brand-primary hover:bg-blue-50 transition-all text-center"
                  >
                    <img src="/ai-sheets-stroke-rounded 1.svg" alt="Design" className="w-8 h-8 mx-auto mb-2" />
                    <span className="font-semibold text-sm">Design</span>
                    <p className="text-xs text-gray-500 mt-1">Engineering design disciplines</p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('site-supervision');
                      setFormData({ ...formData, interests: '' });
                    }}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-brand-primary hover:bg-blue-50 transition-all text-center"
                  >
                    <img src="/Group 32.svg" alt="Site Supervision" className="w-8 h-8 mx-auto mb-2" />
                    <span className="font-semibold text-sm">Site Supervision</span>
                    <p className="text-xs text-gray-500 mt-1">On-site engineering management</p>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('');
                      setFormData({ ...formData, interests: '' });
                    }}
                    className="text-sm text-brand-primary hover:underline mb-2"
                  >
                    ← Back to categories
                  </button>
                  
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                    {(selectedCategory === 'design' ? designOptions : siteSupervisionOptions).map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="interests"
                          value={option}
                          checked={formData.interests === option}
                          onChange={(e) => {
                            setFormData({ ...formData, interests: e.target.value });
                            setErrors({ ...errors, interests: undefined });
                          }}
                          className="w-4 h-4 text-brand-primary"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              {errors.interests && (
                <p className="text-red-500 text-xs mt-1">{errors.interests}</p>
              )}
            </div>

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
