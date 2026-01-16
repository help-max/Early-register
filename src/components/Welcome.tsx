const imgLogo = "https://www.figma.com/api/mcp/asset/658122b3-00f5-4ad8-9a14-f05b52fbe6a5";
const imgEngineer = "https://www.figma.com/api/mcp/asset/f533aa2e-0820-4474-993a-11568c8b74d7";
const imgGroup = "https://www.figma.com/api/mcp/asset/37300276-f879-4d03-b8b1-d6a1286d9f91";
const imgEllipse = "https://www.figma.com/api/mcp/asset/4fcdd5df-e55d-4ea9-b668-4b2c4b288460";

interface WelcomeProps {
  onGetStarted?: () => void;
}

export default function Welcome({ onGetStarted }: WelcomeProps) {
  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    }
  };

  return (
    <div className="bg-bg-light relative w-full h-screen flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="bg-white border-brand-light border-b-4 border-l-2 border-r-[0.5px] border-solid border-t-[0.5px] flex flex-col gap-2 sm:gap-3 md:gap-4 items-center justify-center p-3 sm:p-4 md:p-5 rounded-xl shadow-[0px_5px_14.6px_0px_rgba(0,123,255,0.05)] w-full max-w-[645px] max-h-[98vh]">
        
        <div className="h-[35px] sm:h-[45px] md:h-[55px] w-[115px] sm:w-[150px] md:w-[180px] relative flex-shrink-0">
          <img 
            alt="Delveng Logo" 
            className="w-full h-full object-cover" 
            src={imgLogo} 
          />
        </div>

        <div className="flex flex-col items-center text-center w-full flex-shrink-0">
          <h1 className="font-bold text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] text-brand-primary leading-tight">
            Welcome to Delveng
          </h1>
        </div>

        <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] h-[130px] sm:h-[165px] md:h-[200px] lg:h-[230px] flex items-center justify-center flex-shrink-0">
          <div className="absolute left-[21%] top-[4%] w-[58%] h-[91%] overflow-hidden">
            <img 
              alt="Decorative shapes" 
              className="w-full h-full" 
              src={imgGroup} 
            />
          </div>
          
          <div className="absolute right-0 top-[4%] w-[30.6%] h-[45.8%]">
            <img 
              alt="Decorative circle" 
              className="w-full h-full" 
              src={imgEllipse} 
            />
          </div>
          
          <div className="absolute left-0 top-0 w-full h-full">
            <img 
              alt="Engineer working with laptop" 
              className="w-full h-full object-cover" 
              src={imgEngineer} 
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3 items-center w-full">
          <p className="font-bold text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-text-dark text-center max-w-full leading-tight px-6 sm:px-10 md:px-12">
            Build real-world engineering skills for a better professional future
          </p>

          <p className="font-medium text-[12px] sm:text-[13px] md:text-[14px] text-text-secondary text-center max-w-full px-8 sm:px-12 md:px-16 leading-snug">
            Learn through hands-on engineering projects inspired by real industry challenges.
          </p>

          <div className="flex flex-col gap-1.5 sm:gap-2 w-full px-6 sm:px-10 md:px-12">
            <div className="flex gap-2 sm:gap-3 items-start">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full flex-shrink-0 mt-1.5"></div>
              <p className="font-medium text-[11px] sm:text-[12px] md:text-[13px] text-text-secondary leading-tight">
                Work on real, industry-inspired engineering projects
              </p>
            </div>

            <div className="flex gap-2 sm:gap-3 items-start">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full flex-shrink-0 mt-1.5"></div>
              <p className="font-medium text-[11px] sm:text-[12px] md:text-[13px] text-text-secondary leading-tight">
                Learn step by step in a professional work environment
              </p>
            </div>

            <div className="flex gap-2 sm:gap-3 items-start">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full flex-shrink-0 mt-1.5"></div>
              <p className="font-medium text-[11px] sm:text-[12px] md:text-[13px] text-text-secondary leading-tight">
                Build skills that matter in today's engineering market
              </p>
            </div>
          </div>

          <button 
            onClick={handleGetStarted}
            className="bg-brand-primary hover:bg-brand-hover border-brand-hover border-b-[6px] border-l-4 border-r-4 border-solid border-t-[0.5px] cursor-pointer flex h-9 sm:h-10 md:h-11 items-center justify-center px-[10px] rounded-xl w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] transition-colors mt-1 mx-6"
          >
            <span className="font-semibold text-[15px] sm:text-[17px] md:text-[18px] text-white">
              Get Started
            </span>
          </button>

          <p className="font-normal text-[10px] sm:text-[11px] md:text-[12px] text-text-secondary text-center max-w-full px-8 sm:px-12 md:px-16 leading-tight">
            Register before the official launch to enjoy exclusive free gifts and special subscription offers.
          </p>
        </div>
      </div>
    </div>
  );
}
