import SwiftUI
import SwiftData

struct FoodResultView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss
    @Bindable var viewModel: CameraViewModel

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Food image preview
                    if let image = viewModel.capturedImage {
                        Image(uiImage: image)
                            .resizable()
                            .scaledToFill()
                            .frame(height: 200)
                            .clipShape(RoundedRectangle(cornerRadius: 16))
                            .padding(.horizontal)
                    }

                    if viewModel.classifierService.isProcessing {
                        ProgressView("Analyzing food...")
                            .padding()
                    } else if let selected = viewModel.selectedResult {
                        // Editing selected result
                        editableResultView
                    } else {
                        // Show classification results
                        resultsList
                    }
                }
            }
            .navigationTitle("Food Analysis")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        viewModel.reset()
                        dismiss()
                    }
                }
                if viewModel.selectedResult != nil {
                    ToolbarItem(placement: .confirmationAction) {
                        Button("Save") {
                            saveEntry()
                        }
                        .fontWeight(.semibold)
                    }
                }
            }
        }
    }

    private var resultsList: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("What did we find?")
                .font(.headline)
                .padding(.horizontal)

            if viewModel.classifierService.results.isEmpty {
                Text("Could not identify food. Try another photo.")
                    .foregroundStyle(.secondary)
                    .padding()
            } else {
                ForEach(viewModel.classifierService.results) { result in
                    Button {
                        viewModel.selectResult(result)
                    } label: {
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                Text(result.foodName)
                                    .font(.body)
                                    .fontWeight(.medium)
                                if let nutrition = result.nutrition {
                                    Text("\(nutrition.caloriesPerServing) cal • \(nutrition.servingSize)")
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                }
                            }

                            Spacer()

                            Text("\(Int(result.confidence * 100))%")
                                .font(.caption)
                                .fontWeight(.medium)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(AppColors.accent.opacity(0.1))
                                .clipShape(Capsule())
                                .foregroundStyle(AppColors.accent)

                            Image(systemName: "chevron.right")
                                .foregroundStyle(.secondary)
                        }
                        .padding()
                        .background(.ultraThinMaterial)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                    }
                    .tint(.primary)
                    .padding(.horizontal)
                }
            }
        }
    }

    private var editableResultView: some View {
        VStack(spacing: 16) {
            GroupBox("Food Details") {
                VStack(spacing: 12) {
                    HStack {
                        Text("Name")
                        Spacer()
                        TextField("Food name", text: $viewModel.editedName)
                            .multilineTextAlignment(.trailing)
                    }
                    Divider()
                    HStack {
                        Text("Calories")
                        Spacer()
                        TextField("0", value: $viewModel.editedCalories, format: .number)
                            .keyboardType(.numberPad)
                            .multilineTextAlignment(.trailing)
                            .frame(width: 80)
                    }
                    Divider()
                    HStack {
                        Text("Protein (g)")
                        Spacer()
                        TextField("0", value: $viewModel.editedProtein, format: .number)
                            .keyboardType(.decimalPad)
                            .multilineTextAlignment(.trailing)
                            .frame(width: 80)
                    }
                    Divider()
                    HStack {
                        Text("Carbs (g)")
                        Spacer()
                        TextField("0", value: $viewModel.editedCarbs, format: .number)
                            .keyboardType(.decimalPad)
                            .multilineTextAlignment(.trailing)
                            .frame(width: 80)
                    }
                    Divider()
                    HStack {
                        Text("Fat (g)")
                        Spacer()
                        TextField("0", value: $viewModel.editedFat, format: .number)
                            .keyboardType(.decimalPad)
                            .multilineTextAlignment(.trailing)
                            .frame(width: 80)
                    }
                    Divider()
                    HStack {
                        Text("Serving")
                        Spacer()
                        TextField("1 serving", text: $viewModel.editedServingSize)
                            .multilineTextAlignment(.trailing)
                    }
                }
                .padding(.vertical, 4)
            }
            .padding(.horizontal)

            Button("Choose Different Food") {
                viewModel.selectedResult = nil
            }
            .font(.subheadline)
            .foregroundStyle(.secondary)
        }
    }

    private func saveEntry() {
        let entry = FoodEntry(
            name: viewModel.editedName,
            calories: viewModel.editedCalories,
            protein: viewModel.editedProtein,
            carbs: viewModel.editedCarbs,
            fat: viewModel.editedFat,
            servingSize: viewModel.editedServingSize,
            imageData: viewModel.compressedImageData
        )
        modelContext.insert(entry)
        try? modelContext.save()
        viewModel.reset()
        dismiss()
    }
}
