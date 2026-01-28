const imgLogo = "/Logo (2) 3 1 (1).png";
const imgBackground = "/74dbf5b50fe888a77d8d297d1ecfdcbc0bb8769f.webp";

interface RegistrationCompleteProps {
  userEmail: string;
  userName: string;
}

export default function RegistrationComplete({ userEmail: _userEmail, userName }: RegistrationCompleteProps) {
  return (
    <div className="relative w-full min-h-screen lg:h-screen bg-white flex flex-col lg:flex-row overflow-x-hidden">
      <div className="flex-1 flex flex-col items-center justify-center lg:justify-start py-6 sm:py-8 lg:py-6 px-4 sm:px-6 lg:px-8 xl:px-10 lg:overflow-y-auto">
        <div className="w-full max-w-[550px] flex flex-col items-start gap-4 sm:gap-5 lg:gap-4">
          <div className="w-[130px] sm:w-[150px] md:w-[160px] lg:w-[140px] h-[39px] sm:h-[45px] md:h-[48px] lg:h-[42px]">
            <img 
              alt="Delveng Logo" 
              className="w-full h-full object-contain" 
              src={imgLogo} 
            />
          </div>

          <div className="w-full flex flex-col gap-2.5 sm:gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-12 lg:h-12 bg-green-500 rounded-full flex items-center justify-center animate-fuzzy-fade-in">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h1 className="font-montserrat font-bold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[20px] leading-tight text-[#002B59]">
                  Registration Successful!
                </h1>
              </div>
            </div>
            <h2 className="font-montserrat font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[18px] leading-tight text-[#002B59] w-full text-left">
              Welcome {userName} to Delveng – Home of Experience
            </h2>
          </div>

          <p className="font-montserrat font-normal text-[13px] sm:text-[14px] md:text-[15px] lg:text-[13px] leading-relaxed text-[#6C757D] w-full text-left">
            We're excited to have you join Delveng, the platform that delivers real engineering experience from actual projects around the world, transformed into clear, practical, and applicable knowledge.
          </p>

          <div className="w-full flex flex-col gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-3 sm:p-4 lg:p-3 rounded-r-lg shadow-sm">
            <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-6 lg:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[14px] leading-tight text-green-800">
                  Early Access Reward
                </h3>
                <p className="font-montserrat font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[12px] leading-relaxed text-green-700">
                  As an early registrant, you'll receive <strong>one full course of your choice for free</strong> when the platform officially launches.
                </p>
                <p className="font-montserrat font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[12px] leading-relaxed text-green-700">
                  You'll be notified by email as soon as it's ready.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 bg-blue-50 border-l-4 border-[#007BFF] p-3 sm:p-4 lg:p-3 rounded-r-lg shadow-sm">
            <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-6 lg:h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[14px] leading-tight text-[#002B59]">
                  Email Confirmation
                </h3>
                <p className="font-montserrat font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[12px] leading-relaxed text-[#212529]">
                  A confirmation email has been sent to your inbox.
                </p>
                <p className="font-montserrat font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[12px] leading-relaxed text-[#212529]">
                  Please verify your email to activate your account and unlock all benefits.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 mt-1">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-3 lg:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-semibold text-[15px] sm:text-[16px] md:text-[18px] lg:text-[15px] leading-tight text-[#002B59]">
                What's Next?
              </h3>
            </div>

            <div className="flex flex-col gap-2 sm:gap-2.5 w-full pl-2">
              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 bg-[#007BFF] rounded-full flex-shrink-0 mt-1.5"></div>
                <p className="font-montserrat font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[12px] leading-relaxed text-[#212529]">
                  Explore engineering fields built on real-world projects
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 bg-[#007BFF] rounded-full flex-shrink-0 mt-1.5"></div>
                <p className="font-montserrat font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[12px] leading-relaxed text-[#212529]">
                  Complete your profile for personalized learning recommendations
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 bg-[#007BFF] rounded-full flex-shrink-0 mt-1.5"></div>
                <p className="font-montserrat font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[12px] leading-relaxed text-[#212529]">
                  Join a community of engineers learning from experience, not theory
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#E0E0E0] my-2 sm:my-3"></div>

          <div className="w-full flex flex-col items-center gap-2 text-center">
            <h4 className="font-montserrat font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[16px] leading-tight text-[#002B59]">
              Delveng
            </h4>
            <p className="font-montserrat font-medium text-[13px] sm:text-[14px] md:text-[15px] lg:text-[13px] leading-relaxed text-[#6C757D] italic">
              Experience is the Best Mentor
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[500px] xl:w-[600px] 2xl:w-[710px] h-[300px] sm:h-[400px] lg:h-full order-first lg:order-last">
        <img 
          src={imgBackground} 
          alt="Engineering workspace" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
