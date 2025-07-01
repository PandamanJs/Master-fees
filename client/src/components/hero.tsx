import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, ZoomIn, ZoomOut, Move } from "lucide-react";
import dashboardImage from "@assets/Dashboard_1751383261879.png";
import logoImage from "@assets/Group 15_1751377323388.png";

export default function Hero() {
  const [isLaptopOn, setIsLaptopOn] = useState(false);
  const [showBootScreen, setShowBootScreen] = useState(false);
  const [bootStage, setBootStage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const zoomModalRef = useRef<HTMLDivElement>(null);

  const bootMessages = [
    "Master Fees",
    "Initializing system...",
    "Loading dashboard...",
    "Ready!"
  ];

  const handleLaptopHover = () => {
    if (!isLaptopOn) {
      setShowBootScreen(true);
      setBootStage(0);
      
      // Stage progression
      setTimeout(() => setBootStage(1), 500);
      setTimeout(() => setBootStage(2), 1200);
      setTimeout(() => setBootStage(3), 2000);
      
      setTimeout(() => {
        setIsLaptopOn(true);
        setShowBootScreen(false);
        setBootStage(0);
      }, 2800); // Extended to 2.8 seconds for full boot sequence
    }
  };

  const handleLaptopLeave = () => {
    setIsLaptopOn(false);
    setShowBootScreen(false);
  };

  const handleDashboardClick = (e: React.MouseEvent) => {
    if (!isLaptopOn || showBootScreen) return;
    
    e.stopPropagation();
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setZoomLevel(2);
      setPanPosition({ x: 0, y: 0 });
    }
  };

  const handleZoomMove = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    });
  };

  const handleZoomClose = () => {
    setIsZoomed(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isZoomed) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  }, [isZoomed, panPosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Constrain panning within reasonable bounds
    const maxPan = (zoomLevel - 1) * 200;
    setPanPosition({
      x: Math.max(-maxPan, Math.min(maxPan, newX)),
      y: Math.max(-maxPan, Math.min(maxPan, newY))
    });
  }, [isDragging, isZoomed, dragStart, zoomLevel]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!isZoomed) return;
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setZoomLevel(prev => Math.max(1, Math.min(4, prev + delta)));
  }, [isZoomed]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isZoomed) return;
    
    if (e.key === 'Escape') {
      handleZoomClose();
    } else if (e.key === '+' || e.key === '=') {
      handleZoomIn();
    } else if (e.key === '-') {
      handleZoomOut();
    }
  }, [isZoomed, handleZoomClose, handleZoomIn, handleZoomOut]);

  // Add keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section id="home" className="bg-gradient-to-br from-white via-slate-50/50 to-brand-mint/5 dark:bg-gradient-to-br dark:from-black dark:via-gray-950 dark:to-brand-mint/10 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
              <span className="block sm:inline typing-effect hover:scale-105 transition-transform duration-300 cursor-pointer">Transform School</span>
              <span className="text-slate-900 dark:text-white block sm:inline fade-in-slow hover:scale-105 transition-transform duration-300 cursor-pointer"> Fee Collection</span>
            </h1>
            <p className="mt-6 sm:mt-8 text-lg sm:text-xl lg:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl animate-fade-in-up delay-200">
              Automate fee collection, streamline payment processing, and provide real-time financial insights. Master Fees empowers schools with modern payment management solutions.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 sm:gap-6 animate-fade-in-up delay-400">
              <Button className="group w-full sm:w-auto bg-brand-teal hover:bg-brand-teal/90 text-white px-8 sm:px-10 lg:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-500 shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-2 focus:ring-4 focus:ring-brand-teal/40 relative overflow-hidden hover-lift cursor-magic hover:animate-heartbeat">
                <span className="relative z-10 group-hover:animate-wiggle">Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
              <Button 
                variant="outline"
                className="group w-full sm:w-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-brand-teal/30 hover:border-brand-teal hover:bg-brand-teal/10 dark:hover:bg-brand-teal/20 text-brand-teal hover:text-brand-teal px-8 sm:px-10 lg:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-500 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1 focus:ring-4 focus:ring-brand-teal/30 relative overflow-hidden hover-tilt cursor-magic hover:animate-rubber-band"
              >
                <span className="relative z-10 group-hover:animate-bounce-subtle">View Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-teal/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4 animate-fade-in-up delay-600">
              <div className="flex items-center bg-brand-teal/5 dark:bg-brand-mint/20 backdrop-blur-sm border border-brand-teal/20 dark:border-brand-mint/30 px-4 sm:px-5 py-3 rounded-xl transition-all duration-300 hover:bg-brand-teal/10 dark:hover:bg-brand-mint/30 hover:scale-105 hover:shadow-lg animate-float delay-100 hover-lift cursor-magic hover:animate-rubber-band">
                <Check className="w-4 h-4 text-brand-teal mr-3 animate-heartbeat hover:animate-bounce-subtle" />
                <span className="text-sm font-bold text-slate-800 dark:text-brand-mint hover:animate-wiggle">Instant Setup</span>
              </div>
              <div className="flex items-center bg-brand-teal/5 dark:bg-brand-mint/20 backdrop-blur-sm border border-brand-teal/20 dark:border-brand-mint/30 px-4 sm:px-5 py-3 rounded-xl transition-all duration-300 hover:bg-brand-teal/10 dark:hover:bg-brand-mint/30 hover:scale-105 hover:shadow-lg animate-float delay-200 hover-lift cursor-magic hover:animate-rubber-band">
                <Check className="w-4 h-4 text-brand-teal mr-3 animate-heartbeat hover:animate-bounce-subtle" />
                <span className="text-sm font-bold text-slate-800 dark:text-brand-mint hover:animate-wiggle">Bank Security</span>
              </div>
              <div className="flex items-center bg-brand-teal/5 dark:bg-brand-mint/20 backdrop-blur-sm border border-brand-teal/20 dark:border-brand-mint/30 px-4 sm:px-5 py-3 rounded-xl transition-all duration-300 hover:bg-brand-teal/10 dark:hover:bg-brand-mint/30 hover:scale-105 hover:shadow-lg animate-float delay-300 hover-lift cursor-magic hover:animate-rubber-band">
                <Check className="w-4 h-4 text-brand-teal mr-3 animate-heartbeat hover:animate-bounce-subtle" />
                <span className="text-sm font-bold text-slate-800 dark:text-brand-mint hover:animate-wiggle">30-Day Trial</span>
              </div>
            </div>
          </div>
          
          <div className="mt-10 sm:mt-12 lg:mt-0 lg:col-span-6 animate-fade-in-right delay-300">
            <div 
              className="relative group max-w-2xl mx-auto lg:max-w-none perspective-1000"
              onMouseEnter={handleLaptopHover}
              onMouseLeave={handleLaptopLeave}
            >
              {/* 3D Background with depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/20 to-brand-teal/20 rounded-3xl transform rotate-1 scale-105 blur-xl opacity-60 transition-all duration-700 group-hover:rotate-0 group-hover:scale-110 group-hover:opacity-80"></div>
              
              {/* 3D Laptop Container with perspective */}
              <div className="relative transform-gpu transition-all duration-700 group-hover:scale-105 group-hover:-rotate-y-2 group-hover:shadow-3xl" style={{ transformStyle: 'preserve-3d' }}>
                {/* Laptop Screen with 3D effect */}
                <div className="relative bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 dark:from-slate-900 dark:via-slate-950 dark:to-black rounded-t-3xl p-4 sm:p-5 shadow-2xl transform-gpu" style={{ transform: 'rotateX(-5deg) translateZ(20px)' }}>
                  {/* 3D Screen Bezel with depth */}
                  <div className="relative bg-gradient-to-b from-black via-slate-900 to-black rounded-t-2xl p-3 shadow-inner border border-slate-700/50">
                    {/* Screen Content with enhanced depth */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden ring-2 ring-slate-700/40 dark:ring-slate-600/40 transition-all duration-700 group-hover:ring-brand-teal/60 relative">
                      {/* Boot screen overlay */}
                      {showBootScreen && (
                        <div className="absolute inset-0 bg-black flex items-center justify-center z-10 laptop-screen-on">
                          <div className="text-center">
                            {bootStage === 0 && (
                              <div className="w-8 h-8 border-2 border-brand-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            )}
                            {bootStage === 1 && (
                              <div className="flex items-center justify-center mb-4">
                                <div className="w-2 h-2 bg-brand-teal rounded-full animate-pulse mr-2"></div>
                                <div className="w-2 h-2 bg-brand-teal rounded-full animate-pulse mr-2 delay-100"></div>
                                <div className="w-2 h-2 bg-brand-teal rounded-full animate-pulse delay-200"></div>
                              </div>
                            )}
                            {bootStage === 2 && (
                              <div className="w-16 h-2 bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-brand-teal to-brand-mint rounded-full animate-pulse" style={{ width: '70%' }}></div>
                              </div>
                            )}
                            {bootStage === 3 && (
                              <div className="w-6 h-6 border-2 border-green-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                              </div>
                            )}
                            <div className="text-brand-mint text-sm font-mono animate-pulse">
                              {bootMessages[bootStage]}
                            </div>
                            {bootStage > 0 && (
                              <div className="text-xs text-brand-light-mint font-mono mt-2 opacity-60">
                                {Math.round((bootStage / 3) * 100)}% complete
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Main dashboard content */}
                      <div 
                        className={`${!isLaptopOn && !showBootScreen ? 'laptop-screen-off' : ''} transition-all duration-300 ${
                          isLaptopOn && !showBootScreen ? 'dashboard-interactive' : ''
                        }`}
                        onClick={handleDashboardClick}
                        onMouseMove={handleZoomMove}
                      >
                        <img 
                          src={dashboardImage} 
                          alt="Master Fees Dashboard Interface showing revenue analytics and payment management" 
                          className={`w-full h-auto transform transition-all duration-500 group-hover:scale-102 ${
                            isLaptopOn ? 'laptop-screen-on' : ''
                          } ${isZoomed ? 'scale-150' : ''}`}
                          style={isZoomed ? {
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                            transform: `scale(2.5) translate(${(50 - zoomPosition.x) * 0.5}%, ${(50 - zoomPosition.y) * 0.5}%)`
                          } : {}}
                          loading="lazy"
                        />
                        
                        {/* Zoom indicator */}
                        {isLaptopOn && !showBootScreen && !isZoomed && (
                          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Click to zoom 🔍
                          </div>
                        )}
                      </div>
                      
                      {/* Subtle screen overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-teal/5 opacity-30 pointer-events-none"></div>
                      
                      {/* Power indicator light */}
                      <div className={`absolute bottom-2 right-2 w-2 h-2 rounded-full transition-all duration-300 ${
                        isLaptopOn ? 'bg-green-400 shadow-lg shadow-green-400/50 animate-pulse' : 'bg-red-400/30'
                      }`}></div>
                    </div>
                    
                    {/* Multi-layer screen reflection */}
                    <div className="absolute inset-3 rounded-xl bg-gradient-to-br from-white/12 via-white/4 to-transparent pointer-events-none"></div>
                    <div className="absolute top-3 left-3 w-1/3 h-1/4 bg-gradient-to-br from-white/20 to-transparent rounded-lg blur-sm pointer-events-none"></div>
                  </div>
                  
                  {/* Laptop Camera with 3D effect */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-b from-slate-600 to-slate-800 dark:from-slate-700 dark:to-slate-900 rounded-full shadow-inner border border-slate-500/50">
                    <div className="w-1.5 h-1.5 bg-slate-800 dark:bg-slate-900 rounded-full mt-0.5 ml-0.5"></div>
                  </div>
                  
                  {/* Screen edge highlights */}
                  <div className="absolute inset-0 rounded-t-3xl border border-slate-600/30 pointer-events-none"></div>
                </div>
                
                {/* 3D Laptop Base/Keyboard with perspective */}
                <div className="relative" style={{ transform: 'rotateX(5deg) translateZ(-10px)' }}>
                  {/* Enhanced laptop hinge with 3D effect */}
                  <div className="w-full h-2 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700 dark:from-slate-800 dark:via-slate-600 dark:to-slate-800 shadow-lg relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                  </div>
                  
                  {/* 3D Laptop Bottom with enhanced depth */}
                  <div className="bg-gradient-to-b from-slate-300 via-slate-350 to-slate-450 dark:from-slate-700 dark:via-slate-750 dark:to-slate-850 rounded-b-3xl p-6 sm:p-8 shadow-2xl border-x border-b border-slate-400/50 dark:border-slate-600/50">
                    {/* 3D Trackpad with realistic depth */}
                    <div className="mx-auto w-20 sm:w-24 h-14 sm:h-16 bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded-xl shadow-inner border-2 border-slate-350/80 dark:border-slate-550/80 mt-3 relative">
                      <div className="absolute inset-1 bg-gradient-to-br from-slate-150 to-slate-250 dark:from-slate-650 dark:to-slate-750 rounded-lg"></div>
                      {/* Trackpad click area */}
                      <div className="absolute bottom-1 inset-x-1 h-0.5 bg-slate-300 dark:bg-slate-500 rounded-full"></div>
                    </div>
                    
                    {/* Enhanced keyboard representation */}
                    <div className="flex justify-center space-x-2 mt-4">
                      <div className="w-3 h-1 bg-slate-400 dark:bg-slate-500 rounded-full shadow-sm"></div>
                      <div className="w-4 h-1 bg-slate-400 dark:bg-slate-500 rounded-full shadow-sm"></div>
                      <div className="w-3 h-1 bg-slate-400 dark:bg-slate-500 rounded-full shadow-sm"></div>
                      <div className="w-2 h-1 bg-slate-400 dark:bg-slate-500 rounded-full shadow-sm"></div>
                    </div>
                    <div className="flex justify-center space-x-1 mt-1">
                      <div className="w-2 h-1 bg-slate-450 dark:bg-slate-550 rounded-full shadow-sm"></div>
                      <div className="w-5 h-1 bg-slate-450 dark:bg-slate-550 rounded-full shadow-sm"></div>
                      <div className="w-2 h-1 bg-slate-450 dark:bg-slate-550 rounded-full shadow-sm"></div>
                    </div>
                    
                    {/* Bottom edge highlight */}
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>
                </div>
              </div>
              
              {/* 3D Floating UI elements with enhanced depth */}
              <div className="absolute -top-8 -right-8 w-12 h-12 bg-gradient-to-br from-brand-mint to-brand-light-mint rounded-2xl opacity-25 animate-float delay-100 transition-all duration-500 group-hover:opacity-80 group-hover:scale-110 shadow-2xl flex items-center justify-center transform-gpu" style={{ transform: 'translateZ(30px) rotateY(-10deg)' }}>
                <div className="w-5 h-5 bg-brand-teal rounded-full shadow-inner"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-brand-teal to-blue-600 rounded-xl opacity-30 animate-float delay-300 transition-all duration-500 group-hover:opacity-85 group-hover:scale-115 shadow-xl transform-gpu" style={{ transform: 'translateZ(25px) rotateY(15deg)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-xl"></div>
              </div>
              <div className="absolute top-1/4 -left-7 w-8 h-8 bg-brand-mint/50 rounded-xl animate-float delay-500 transition-all duration-500 group-hover:opacity-100 group-hover:scale-125 shadow-lg transform-gpu" style={{ transform: 'translateZ(20px) rotateX(15deg)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
              </div>
              <div className="absolute bottom-1/3 -right-5 w-9 h-9 bg-gradient-to-br from-brand-light-mint to-brand-mint rounded-full opacity-35 animate-float delay-700 transition-all duration-500 group-hover:opacity-90 group-hover:scale-120 shadow-xl transform-gpu" style={{ transform: 'translateZ(35px) rotateY(-20deg)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent rounded-full"></div>
              </div>
              

            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Full-screen zoom modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center zoom-modal backdrop-blur-sm"
          onClick={handleZoomClose}
        >
          <div 
            className="relative max-w-7xl max-h-screen p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with controls */}
            <div className="absolute -top-16 left-0 right-0 flex justify-between items-center">
              <div className="flex space-x-4">
                <div className="text-white text-lg font-semibold bg-black/60 px-4 py-2 rounded-lg border border-brand-mint/30">
                  Master Fees Dashboard Preview
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleZoomOut}
                    className="bg-brand-teal/80 hover:bg-brand-teal text-white p-2 rounded-lg zoom-control-btn flex items-center space-x-1"
                    disabled={zoomLevel <= 1}
                  >
                    <ZoomOut className="w-4 h-4" />
                    <span className="text-sm">Out</span>
                  </button>
                  <button
                    onClick={handleZoomIn}
                    className="bg-brand-teal/80 hover:bg-brand-teal text-white p-2 rounded-lg zoom-control-btn flex items-center space-x-1"
                    disabled={zoomLevel >= 4}
                  >
                    <ZoomIn className="w-4 h-4" />
                    <span className="text-sm">In</span>
                  </button>
                  <div className="bg-black/60 text-white px-3 py-2 rounded-lg border border-brand-mint/30 text-sm">
                    {Math.round(zoomLevel * 100)}%
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleZoomClose}
                className="text-white hover:text-brand-mint bg-red-600/80 hover:bg-red-600 rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-200 border border-red-500/50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Zoomed dashboard image container */}
            <div 
              ref={zoomModalRef}
              className="relative overflow-hidden rounded-xl shadow-2xl border border-brand-mint/20 bg-white"
              style={{ 
                width: '90vw', 
                height: '80vh',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              <img 
                src={dashboardImage} 
                alt="Master Fees Dashboard Interface - Full View" 
                className="w-full h-auto max-w-none transition-transform duration-200 select-none"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
                  transformOrigin: 'center center'
                }}
                draggable={false}
              />
              
              {/* Interactive overlay hints */}
              <div className="absolute top-6 left-6 bg-brand-teal/90 text-white px-4 py-3 rounded-xl text-sm shadow-lg border border-brand-mint/30 animate-pulse">
                <div className="flex items-center space-x-2">
                  <Move className="w-4 h-4" />
                  <span>Drag to pan • Scroll to zoom</span>
                </div>
              </div>
              
              {/* Feature highlights */}
              <div className="absolute top-20 right-6 bg-gradient-to-br from-brand-mint/90 to-brand-teal/90 text-white px-4 py-3 rounded-xl text-sm shadow-lg border border-white/20">
                <div className="font-semibold mb-1">Dashboard Features:</div>
                <div className="text-xs space-y-1">
                  <div>• Real-time payment tracking</div>
                  <div>• Student fee management</div>
                  <div>• Revenue analytics</div>
                  <div>• Payment reminders</div>
                </div>
              </div>
              
              {/* Bottom instruction bar */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full text-sm border border-brand-mint/30">
                Click outside or press ESC to close
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
