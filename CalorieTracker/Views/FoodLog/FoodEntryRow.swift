import SwiftUI

struct FoodEntryRow: View {
    let entry: FoodEntry

    var body: some View {
        HStack(spacing: 12) {
            // Thumbnail
            if let imageData = entry.imageData,
               let uiImage = UIImage(data: imageData) {
                Image(uiImage: uiImage)
                    .resizable()
                    .scaledToFill()
                    .frame(width: 50, height: 50)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
            } else {
                ZStack {
                    RoundedRectangle(cornerRadius: 10)
                        .fill(Color.orange.opacity(0.1))
                    Image(systemName: "fork.knife")
                        .foregroundStyle(AppColors.accent)
                }
                .frame(width: 50, height: 50)
            }

            // Name & details
            VStack(alignment: .leading, spacing: 4) {
                Text(entry.name)
                    .font(.body)
                    .fontWeight(.medium)

                HStack(spacing: 8) {
                    Text(entry.servingSize)
                    Text("•")
                    Text(entry.timestamp.timeFormatted)
                }
                .font(.caption)
                .foregroundStyle(.secondary)
            }

            Spacer()

            // Calories
            VStack(alignment: .trailing, spacing: 2) {
                Text("\(entry.calories)")
                    .font(.title3)
                    .fontWeight(.bold)
                    .fontDesign(.rounded)
                    .foregroundStyle(AppColors.accent)
                Text("cal")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 4)
    }
}
