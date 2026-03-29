import Foundation
import SwiftUI

// MARK: - Date Extensions
extension Date {
    var startOfDay: Date {
        Calendar.current.startOfDay(for: self)
    }

    var endOfDay: Date {
        Calendar.current.date(byAdding: .day, value: 1, to: startOfDay)!.addingTimeInterval(-1)
    }

    var shortFormatted: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .none
        return formatter.string(from: self)
    }

    var timeFormatted: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .none
        formatter.timeStyle = .short
        return formatter.string(from: self)
    }

    var isToday: Bool {
        Calendar.current.isDateInToday(self)
    }

    func daysUntil(_ date: Date) -> Int {
        Calendar.current.dateComponents([.day], from: self.startOfDay, to: date.startOfDay).day ?? 0
    }
}

// MARK: - Unit Conversions
extension Double {
    var lbsToKg: Double { self * 0.453592 }
    var kgToLbs: Double { self / 0.453592 }
    var inchesToCm: Double { self * 2.54 }
    var cmToInches: Double { self / 2.54 }

    var feetAndInchesString: String {
        let totalInches = Int(self)
        let feet = totalInches / 12
        let inches = totalInches % 12
        return "\(feet)'\(inches)\""
    }
}

// MARK: - Int Extensions
extension Int {
    var calorieFormatted: String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        return (formatter.string(from: NSNumber(value: self)) ?? "\(self)") + " cal"
    }
}

// MARK: - View Extensions
extension View {
    func cardStyle() -> some View {
        self
            .padding()
            .background(.ultraThinMaterial)
            .clipShape(RoundedRectangle(cornerRadius: 16))
            .shadow(color: .black.opacity(0.05), radius: 5, x: 0, y: 2)
    }
}
