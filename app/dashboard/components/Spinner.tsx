import React from "react";
export default function Spinner() {
return (
<div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
</div>
);
}