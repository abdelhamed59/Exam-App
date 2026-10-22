import { FolderCode } from 'lucide-react'
interface LogoProps {
  textColor?: string;
}
export default function Logo({ textColor }: LogoProps) {
  return (
      <div className="flex items-center gap-2 ">
                  <FolderCode className={`size-7.5 ${textColor || 'text-blue-600'}`} />
            
                <span className={`text-xl font-bold ${textColor || 'text-blue-600'}`}>Exam App</span>
              </div>
  )
}
