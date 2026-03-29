import SwiftUI
import SwiftData

struct ManualEntryView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    @State private var name = ""
    @State private var calories = ""
    @State private var protein = ""
    @State private var carbs = ""
    @State private var fat = ""
    @State private var servingSize = "1 serving"
    @State private var searchResults: [FoodNutrition] = []

    var onSave: (() -> Void)?

    var body: some View {
        NavigationStack {
            Form {
                Section("Food Search") {
                    TextField("Search food name...", text: $name)
                        .onChange(of: name) { _, newValue in
                            searchFood(newValue)
                        }

                    if !searchResults.isEmpty {
                        ForEach(searchResults, id: \.name) { food in
                            Button {
                                fillFromDatabase(food)
                            } label: {
                                HStack {
                                    Text(food.name)
                                    Spacer()
                                    Text("\(food.caloriesPerServing) cal")
                                        .foregroundStyle(.secondary)
                                }
                            }
                            .tint(.primary)
                        }
                    }
                }

                Section("Nutrition Info") {
                    HStack {
                        Text("Calories")
                        Spacer()
                        TextField("0", text: $calories)
                            .keyboardType(.numberPad)
                            .multilineTextAlignment(.trailing)
                            .frame(width: 100)
                    }
                    HStack {
                        Text("Protein (g)")
                        Spacer()
                        TextField("0", text: $protein)
                            .keyboardType(.decimalPad)
                            .multilineTextAlignment(.trailing)
                            .frame(width: 100)
                    }
                    HStack {
                        Text("Carbs (g)")
                        Spacer()
                        TextField("0", text: $carbs)
                            .keyboardType(.decimalPad)
                            .multilineTextAlignment(.trailing)
                            .frame(width: 100)
                    }
                    HStack {
                        Text("Fat (g)")
                        Spacer()
                        TextField("0", text: $fat)
                            .keyboardType(.decimalPad)
                            .multilineTextAlignment(.trailing)
                            .frame(width: 100)
                    }
                    HStack {
                        Text("Serving Size")
                        Spacer()
                        TextField("1 serving", text: $servingSize)
                            .multilineTextAlignment(.trailing)
                            .frame(width: 150)
                    }
                }
            }
            .navigationTitle("Add Food")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") { saveEntry() }
                        .disabled(name.isEmpty || calories.isEmpty)
                        .fontWeight(.semibold)
                }
            }
        }
    }

    private func searchFood(_ query: String) {
        guard query.count >= 2 else {
            searchResults = []
            return
        }
        let lowered = query.lowercased()
        searchResults = FoodDatabase.foods.values
            .filter { $0.name.lowercased().contains(lowered) }
            .sorted { $0.name < $1.name }
            .prefix(5)
            .map { $0 }
    }

    private func fillFromDatabase(_ food: FoodNutrition) {
        name = food.name
        calories = "\(food.caloriesPerServing)"
        protein = String(format: "%.1f", food.proteinGrams)
        carbs = String(format: "%.1f", food.carbsGrams)
        fat = String(format: "%.1f", food.fatGrams)
        servingSize = food.servingSize
        searchResults = []
    }

    private func saveEntry() {
        let entry = FoodEntry(
            name: name,
            calories: Int(calories) ?? 0,
            protein: Double(protein) ?? 0,
            carbs: Double(carbs) ?? 0,
            fat: Double(fat) ?? 0,
            servingSize: servingSize
        )
        modelContext.insert(entry)
        try? modelContext.save()
        onSave?()
        dismiss()
    }
}
