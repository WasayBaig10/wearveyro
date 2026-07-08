// Placeholder items data — swap with Convex query later
export interface ItemsProduct {
  id: string;
  name: string;
  price: string;
  category: string;
  imagePrimary: string;
  imageSecondary?: string;
  sizes: string[];
  stockStatus: "low" | "soldout" | "new" | "normal";
  inventoryPercent?: number;
}

export const archiveItems: ItemsProduct[] = [
  {
    id: "kinetic-shell-v1",
    name: "KINETIC SHELL V1",
    price: "Rs. 18,500",
    category: "OUTERWEAR",
    imagePrimary:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMcfKDy2cyY-dSQ0shZRu5YKGHomqo5HRByBS1-5KcKTSTWEl5sB1uaK-naEfD8x8_Wh8445_UR3shoKI38f6R6Y0gd3JSDC2PtmKrYfDJc5uPdPcMliRBP-wcUCNjMxIcjMvag6Q4qIWkRYcgCYqdRdob_nR2Z0yhdyHyemJXRK6exoGglw-nBDSRJWeikufL7nqMcoV-gYf4pg8aDqsw-LhatUjsNuQQ2oXhttE0lDYZl8f6CxNqSMQ4Xpyz9XJli170KNhZz6xw",
    imageSecondary:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7X0iuSwzVskBy0ZyPPLF5EcoK39bUlWC0xLnnorgMVbKybyRdrpWoKSiGvJ3GEE-GnxNoLsa-gYvu-eI9Cj5z6yd0j4kSQKd1VEpnUjqrhj-BFcGGKfHbcR4ZgOsrwBGJ1TiPZncutBfaFfOohBBBVdgNAPsKviX302SN-yQXps9O7v4iLMHHc0J7X4FQSpiCQUNtDbOlfQPdm6DZNgVQLhBWyaDjNlCvze4OlIPHA7kGvdtelu780kVRUQwRRu6Ih2i5disbOpjv",
    sizes: ["S", "M", "L", "XL"],
    stockStatus: "low",
  },
  {
    id: "void-box-tee",
    name: "VOID BOX TEE",
    price: "Rs. 6,800",
    category: "TOPS",
    imagePrimary:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbGvsBIN6LTbA2tqDEFQIqAMgPsh2X6JW435Sa6kuLheWOkAaW9mTcXiq59XfCtgnZ5YL2ITemLk9jPjFYUaLpEIQ6jXYUiFrPxnAojcpxJ0Iw864nKB__YQy608soEJVU3aT1-x1n23dNHDAtL-in1YUH_jQnzHOZ7kM5GiKHpoWq2nEqnirQb7JYfDYzrOMwfvX4uXHs65TBJpvj8Q59178-oZgMlA3HL1nShlts6KIW8Fz_MPbnMgVy0tZC2Ug1qgaB5BzhBZ7s",
    imageSecondary:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCc6IyilOQDVI3InLRCJ-TiyvLTpL2zyIgo8PFok5gQUD9fV0cTQKjU7ET-El8Cc3lA_3VvvWoZ4JxTOBSHcg0WKZSdIt-ybbTCTVfhfP9QSRLh2gt9BSD13K2pE7rmEoWF69ICpk6Om0sQihJc8EC_MIOoarkyauIesb05oQsvF7jH-6_onaRXBLa6u7gvaJXnIibKr4fXY0-pyi9rdr0cQ0MR1ghq4i_I4pHghY5pgu8uMGsjrVv_fAPj9TSgqH5x5pTxaZ26KB4n",
    sizes: ["S", "M", "L"],
    stockStatus: "normal",
    inventoryPercent: 75,
  },
  {
    id: "cargo-vest-02",
    name: "CARGO VEST 02",
    price: "Rs. 14,200",
    category: "OUTERWEAR",
    imagePrimary:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpDRnQyT1UOikjNEWCCAt5WK7dy78cNQBdymCtrGOo_WTCb1E5S9zO4aFsJFRIt_D-PFht8XWApgheeBeyTmN2IWxFYhHAbcC5jeKm7FMRCsz1_c1o9TB11UijS_BTOTmzDJ4XsuS3tAVeqrixnsyYJPrBTT_wYcvn9m32dPm_95jJyrF3r3VA8BCbRXRc3ca8uYLL1MnskT3dY-RqkGwsSRR8HmqHcXxPSpPl9LHNEfMZ4zEyHEyP49UZW1E1rP0SwEhU9Ve8djJv",
    imageSecondary:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_Ry0WRnyl2QWVIYtaNU80W5Dj8kbnaqNUv-26QmFfCG2KNSlqnp0BEUhkSmruNLCiHWAzf-cJ5D6yWHRlZEYBlMeskGkY9Q9pq-Okrhjh9aao-Ci2uWaMMCXEjeX3XvGsX4ZVl_tbsfQqqqjS_2BphgKFWUwuoLA6-1tb7CFjX_WR-D76iNDW1ljzJfZssX-65POrQfIgyPN2pKlG95w1I-1DnhMTFcxUPLMEsdr3TUJgN6XUDOvjyvW4zkTSGKahlMgn__pkM5lT",
    sizes: ["OS"],
    stockStatus: "normal",
  },
  {
    id: "rebel-hoodie",
    name: "REBEL HOODIE",
    price: "Rs. 9,500",
    category: "TOPS",
    imagePrimary:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4TxGDhOxXsUoXS309gyYANv14wfEOP9v9nGhlOMXLWFdKCzRitTYT1vwpbqRXWOfO43p5x2s_yzGl3I7-34aZkX19M3EgmkKg2JQ-2heYM6HmzT6dZLNIsnX556j6p9gXh3m9CkibHOFgs8g-nNeNP8Y0yXShYy6APLyXmVT2X7cNN2ykwU0MazXy_Jvy0L9bSF4AHjEfpukc34VRRJru08gdcm_1g9yhD-J2iNEv5dL-p6HEhACw_pOyEZcjsFVdc9kjoWQjGH2C",
    sizes: ["S", "M", "L", "XL"],
    stockStatus: "soldout",
  },
  {
    id: "neon-windrunner",
    name: "NEON WINDRUNNER",
    price: "Rs. 11,000",
    category: "OUTERWEAR",
    imagePrimary:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCEA24spKNv534sdcmmu_Zx0WQ58RkaWameHcKiimFjPAHm6C90hpDelXql_59OPImo_hzUNYMHJibMp47SIDLj7dMNKt0N0iMMXPM-KrDkd_aL_f37bUapmxd_mroH6aIIUaOf1AUBSKUWRHPLTqiYYsXCLFeOHrsWcGxYLTVd-ZaX8iJc-huAdFE19epWcVhlDuKIBjor-fw_J82ittpY6jkXT9Oq4OqWuYO7sHuYSEfSSK4pWbC55GkE7qMmf2sGEwlTUD89qbTA",
    sizes: ["S", "M", "L"],
    stockStatus: "new",
  },
];
