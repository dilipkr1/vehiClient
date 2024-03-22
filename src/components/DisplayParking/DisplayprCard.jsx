import React from "react";

export default function () {
  return (
    <div>
      <div className="displayImageOnClick gap-6 lg:flex flex customMobflexCol justify-center text-main font-roboto lg:flex-1">
        <ParkingCard
          image={selectedTag.img}
          tagName={selectedTag.tagName}
          tagTitle={selectedTag.tagTitle}
          tagParagrpah={selectedTag.tagParagraph}
        />
      </div>
    </div>
  );
}
